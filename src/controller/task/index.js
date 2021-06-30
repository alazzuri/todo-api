import { getRepository } from "typeorm";
import { TaskEntity } from "../../entities/task.js";
import {
  authErrors,
  clientErrors,
  invalidIdExeption,
  JWT_ERROR,
  missingInputException,
  taskDoesNotExistException,
} from "../../exceptions/index.js";
import { TASK_DELETED } from "../../utils/constants.js";
import { getUserIdFromJwt } from "../../utils/user.js";
import { taskInput } from "./inputSchema.js";

export const getAllTasks = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const tasks = await taskRepository.find({ where: { userId } });

    return res.status(200).json(tasks);
  } catch (error) {
    if (error.name === JWT_ERROR || authErrors.includes(error.message))
      return res.status(401).json(error.message);

    if (clientErrors.includes(error.message))
      return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

export const getOneTask = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const id = +req.params.id;

    if (!id) throw invalidIdExeption;

    const existingTask = await taskRepository.findOne({
      where: { id, userId },
    });

    if (!existingTask) throw taskDoesNotExistException;

    return res.status(200).json(existingTask);
  } catch (error) {
    if (error.name === JWT_ERROR || authErrors.includes(error.message))
      return res.status(401).json(error.message);

    if (clientErrors.includes(error.message))
      return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

export const createTask = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const inputKeys = Object.keys(req.body);

    const missingKey = taskInput.filter((key) => !inputKeys.includes(key));

    if (missingKey.length > 0) throw missingInputException;

    const newTask = taskRepository.create({ ...req.body, userId });

    const createdTask = await taskRepository.insert(newTask);

    const taskData = await taskRepository.findOne({
      where: { id: createdTask.identifiers[0].id },
    });

    return res.status(200).json(taskData);
  } catch (error) {
    if (error.name === JWT_ERROR || authErrors.includes(error.message))
      return res.status(401).json(error.message);

    if (clientErrors.includes(error.message))
      return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

export const updateTask = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const id = +req.params.id;

    if (!id) throw invalidIdExeption;

    const existingTask = await taskRepository.findOne({
      where: { id, userId },
    });

    if (!existingTask) throw taskDoesNotExistException;

    const updatedTask = taskRepository.merge(existingTask, req.body);

    const savedTask = await taskRepository.save(updatedTask);

    return res.status(200).json(savedTask);
  } catch (error) {
    if (error.name === JWT_ERROR || authErrors.includes(error.message))
      return res.status(401).json(error.message);

    if (clientErrors.includes(error.message))
      return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};

export const deleteTask = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const id = +req.params.id;

    if (!id) throw invalidIdExeption;

    const existingTask = await taskRepository.findOne({
      where: { id, userId },
    });

    if (!existingTask) throw taskDoesNotExistException;

    await taskRepository.delete({ id });

    return res.status(200).json(TASK_DELETED);
  } catch (error) {
    if (error.name === JWT_ERROR || authErrors.includes(error.message))
      return res.status(401).json(error.message);

    if (clientErrors.includes(error.message))
      return res.status(400).json(error.message);

    return res.status(500).json(error.message);
  }
};
