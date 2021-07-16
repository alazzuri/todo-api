import { getRepository } from "typeorm";
import { UserEntity } from "../../entities/user.js";
import {
  invalidPasswordException,
  missingInputException,
  sendErrorResponse,
  userDoesNotExistException,
  userExistException,
} from "../../exceptions/index.js";
import { findElementByArgs } from "../../utils/db.js";
import { signWithJwt } from "../../utils/jwt.js";
import { getEmailFromJwt } from "../../utils/user.js";
import { registerInput } from "../user/inputSchema.js";

export const registerUser = async (req, res) => {
  const userRepository = getRepository(UserEntity);

  try {
    const inputKeys = Object.keys(req.body);

    const missingKey = registerInput.filter((key) => !inputKeys.includes(key));

    if (missingKey.length > 0) throw missingInputException;

    const { email } = req.body;

    const existingUser = await findElementByArgs(userRepository, { email });

    if (existingUser) {
      throw userExistException;
    }

    const newUser = userRepository.create(req.body);

    const createdUser = await userRepository.insert(newUser);

    const jwt = signWithJwt({ email, id: createdUser.identifiers[0].id });

    return res.status(201).json({ jwt });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const loginUser = async (req, res) => {
  const userRepository = getRepository(UserEntity);

  try {
    const { email, password } = req.body;

    const existingUser = await findElementByArgs(userRepository, { email });

    if (!existingUser) {
      throw userDoesNotExistException;
    }

    if (password !== existingUser.password) {
      throw invalidPasswordException;
    }

    const jwt = signWithJwt({ email, id: existingUser.id });

    return res.status(201).json({ jwt });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getUsers = async (_, res) => {
  const userRepository = getRepository(UserEntity);

  try {
    const users = await userRepository.find();

    return res.status(200).json(users);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

export const getMe = async (req, res) => {
  const userRepository = getRepository(UserEntity);

  try {
    const email = getEmailFromJwt(req.headers);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw userDoesNotExistException;

    const { firstName, lastName, id } = user;

    return res.status(200).json({ id, firstName, lastName, email });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
