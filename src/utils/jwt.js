import JWT from "jsonwebtoken";
import { enviroment } from "../config/enviroment.js";

const { JWT_SECRET } = enviroment;

export const signWithJwt = (payload) => JWT.sign(payload, JWT_SECRET);

export const verifyWithJwt = (token) => JWT.verify(token, JWT_SECRET);
