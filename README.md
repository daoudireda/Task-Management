# TaskManagement

This project was generated with Angular CLI version 18.2.4.

##  Overview
TaskManagement is a full-stack application designed to manage tasks. It has both frontend and backend components, with data stored in a JSON file for simplicity. The frontend is built using Angular, while the backend uses Node.js with Express to handle HTTP requests and manage tasks.

##  Technologies Used
###  Frontend:
- Angular: The project uses Angular for building the user interface. It leverages Angular services and HTTPClient for communication with the backend.
###  Backend:
- Node.js & Express: The backend is built using Node.js with the Express framework. It handles CRUD operations (Create, Read, Update, Delete) for tasks via HTTP requests.
- JSON File: Instead of using a database, this project uses a JSON file (tasks.json) to store task data. The backend reads from and writes to this file for persistence.

##  Features
- Add, delete, and update tasks.
- Display tasks stored in the JSON file.
- Communicates between the frontend and backend using HTTP requests.
- Fully operational local development environment with live reloading on the frontend.

### How to Run the Project
##  Frontend:
- Install dependencies for the Angular app:
```bash npm install```
Run the Angular development server:
```bash ng serve```
- Navigate to http://localhost:4200/. The application will automatically reload if you make changes to any of the source files.

## Backend:
1. Navigate to the /backend folder:
``` bash cd backend ```
2. Install backend dependencies:
```  bash npm install ```
3. Start the Express server:
``` bash 'node server.js' ```
This will start the backend server on http://localhost:3000/.

## Development
- The Angular frontend communicates with the backend via HTTP requests using Angular's HttpClient service.
- The backend serves the API routes using Express to handle requests and read/write from the tasks.json file.
- Any changes to the backend or frontend code will automatically be reflected when the development servers are running.

## Backend API Endpoints
### POST /task
- Adds a new task to the tasks.json file.
### GET /tasks
- Retrieves all tasks from the tasks.json file.
### DELETE /task/:id
- Deletes a task with the specified ID from the tasks.json file.
### PUT /task/:id
- Updates the task with the specified ID.

### File Structure
- /src/app: Contains all Angular components, services, and modules.
- /backend: Contains the Express server and the tasks.json file for backend operations.
- /tasks.json: A JSON file that stores task data persistently.

### Future Enhancements
- Move to a real database (e.g., MongoDB or PostgreSQL) instead of using a JSON file.
- Add user authentication and task assignment based on users.
- Implement task prioritization and filtering.

