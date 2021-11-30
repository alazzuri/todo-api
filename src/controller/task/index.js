import typeorm from "typeorm";
import { TaskEntity } from "../../entities/task.js";
import {
  invalidIdExeption,
  missingInputException,
  sendErrorResponse,
  taskDoesNotExistException,
} from "../../exceptions/index.js";
import { TASK_DELETED } from "../../utils/constants.js";
import { getUserIdFromJwt } from "../../utils/user.js";
import { taskInput } from "./inputSchema.js";

const { getRepository } = typeorm;

export const getAllTasks = async (req, res) => {
  const taskRepository = getRepository(TaskEntity);

  try {
    const userId = getUserIdFromJwt(req.headers);

    const tasks = await taskRepository.find({ where: { userId } });

    return res.status(200).json(tasks);
  } catch (error) {
    sendErrorResponse(error, res);
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
    sendErrorResponse(error, res);
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

    return res.status(201).json(taskData);
  } catch (error) {
    sendErrorResponse(error, res);
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
    sendErrorResponse(error, res);
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
    sendErrorResponse(error, res);
  }
};
