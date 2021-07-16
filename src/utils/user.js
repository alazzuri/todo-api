import { verifyWithJwt } from "./jwt.js";
import { authRequiredException } from "../exceptions/index.js";

export const getUserIdFromJwt = ({ authorization: jwt }) => {
  if (!jwt) throw authRequiredException;

  const { id } = verifyWithJwt(jwt);

  return id;
};

export const getEmailFromJwt = ({ authorization: jwt }) => {
  if (!jwt) throw authRequiredException;

  const { email } = verifyWithJwt(jwt);

  return email;
};
