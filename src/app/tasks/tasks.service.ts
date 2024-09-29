import { inject, Injectable, signal } from '@angular/core';

import { Task, type NewTaskData } from './task/task.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private httpClient = inject(HttpClient);

  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  constructor() {
    this.fetchTasksFromServer();
  }

  private fetchTasksFromServer() {
    this.httpClient
      .get<{ tasks: Task[] }>('http://localhost:3000/tasks')
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to fetch tasks'));
        })
      )
      .subscribe((response) => {
        if (response.tasks) {
          this.tasks.set(response.tasks);
        }
      });
  }

  addTask(taskData: Task, userId: string) {
    this.addTaskToServer(taskData);
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.removeTaskFromServer(id);
  }

  private addTaskToServer(taskData: Task) {
    const prevTasks = this.tasks();
    if (prevTasks.some((task) => task.id === taskData.id)) {
      this.tasks.set(prevTasks.filter((task) => task.id !== taskData.id));
    }

    this.httpClient
      .post('http://localhost:3000/task', {
        task: {
          id: taskData.id,
          userId: taskData.userId,
          title: taskData.title,
          summary: taskData.summary,
          dueDate: taskData.dueDate,
        },
      })
      .pipe(
        catchError(() => {
          this.tasks.set(prevTasks);
          return throwError(() => new Error('Failed to add task'));
        })
      )
      .subscribe((response) => {
        this.tasks.set([...prevTasks, taskData]);
      });
  }

  private removeTaskFromServer(id: string) {
    const prevTasks = this.tasks(); // Get the current tasks

    // Perform the HTTP DELETE request
    this.httpClient
      .delete(`http://localhost:3000/task/${id}`)
      .pipe(
        catchError((error) => {
          // If there's an error, log it and restore the previous tasks state
          console.error('Failed to delete task:', error);
          this.tasks.set(prevTasks);
          return throwError(() => new Error('Failed to delete task'));
        })
      )
      .subscribe(() => {
        // Once the server confirms the task is deleted, update the local state
        this.tasks.set(prevTasks.filter((task) => task.id !== id));
      });
  }
}
