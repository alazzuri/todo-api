import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  updateTask,
} from "../controller/task/index.js";

const router = Router();

router.get("/v1/tasks/", getAllTasks);

router.get("/v1/tasks/:id", getOneTask);

router.post("/v1/tasks/", createTask);

router.put("/v1/tasks/:id", updateTask);

router.delete("/v1/tasks/:id", deleteTask);

export default router;
