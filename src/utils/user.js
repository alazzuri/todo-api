import { verifyWithJwt } from "./jwt.js";
import { authRequiredException } from "../exceptions/index.js";

export const getUserIdFromJwt = ({ authorization: jwt }) => {
  if (!jwt) throw authRequiredException;

  const { id } = verifyWithJwt(jwt);

  return id;
};
