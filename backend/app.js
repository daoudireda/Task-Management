import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

// app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/tasks", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/tasks.json");

  const tasksData = JSON.parse(fileContent);

  res.status(200).json({ tasks: tasksData });
});

app.post("/task", async (req, res) => {
  const { task } = req.body;

  const fileContent = await fs.readFile("./data/tasks.json");

  const tasksData = JSON.parse(fileContent);

  tasksData.push(task);

  await fs.writeFile("./data/tasks.json", JSON.stringify(tasksData));

  res.status(201).json({ task });
});

app.put("/addTask", async (req, res) => {
  try {
  
    const tasksId = req.body.taskId; // Changed from req.body.id to req.body.taskId
    const fileContent = await fs.readFile("./data/tasks.json");
    const tasksData = JSON.parse(fileContent);

    const task = tasksData.find((task) => task.id === tasksId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const userTaskFileContent = await fs.readFile("./data/userTasks.json"); // Assuming this is user task data
    const userTasksData = JSON.parse(userTaskFileContent);

    let updatedTasks = userTasksData;
    if (!userTasksData.some((task) => task.id === tasksId)) {
      updatedTasks = [...userTasksData, task];
    }

    console.log(updatedTasks);

    await fs.writeFile("./data/userTasks.json", JSON.stringify(updatedTasks)); // Updated file path if it's for user-specific tasks

    res.status(200).json({ userTask: updatedTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  const fileContent = await fs.readFile("./data/tasks.json");

  const tasksData = JSON.parse(fileContent);

  const updatedTasks = tasksData.filter((task) => task.id !== id);

  await fs.writeFile("./data/tasks.json", JSON.stringify(updatedTasks));

  res.status(204).send();
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
