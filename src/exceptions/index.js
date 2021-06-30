// Messages
export const USER_ALREADY_EXISTS = "El usuario ya se encuentra registrado";
export const ICOMPLETE_INPUT = "Alguno de los datos requeridos está incompleto";
export const USER_NOT_EXISTS = "El usuario no existe";
export const INVALID_PASSWORD = "Contraseña incorrecta";
export const AUTH_REQUIRED = "Requiere Autorización";
export const JWT_ERROR = "JsonWebTokenError";
export const INVALID_ID = "ID Inválido";
export const TASK_NOT_EXISTS = "Tarea inexistente";

// Error type
export const clientErrors = [
  USER_ALREADY_EXISTS,
  ICOMPLETE_INPUT,
  USER_NOT_EXISTS,
  INVALID_PASSWORD,
  INVALID_ID,
  TASK_NOT_EXISTS,
];

export const authErrors = [AUTH_REQUIRED];

// Exceptions
export const userExistException = new Error(USER_ALREADY_EXISTS);
export const missingInputException = new Error(ICOMPLETE_INPUT);
export const userDoesNotExistException = new Error(USER_NOT_EXISTS);
export const invalidPasswordException = new Error(INVALID_PASSWORD);
export const authRequiredException = new Error(AUTH_REQUIRED);
export const invalidIdExeption = new Error(INVALID_ID);
export const taskDoesNotExistException = new Error(TASK_NOT_EXISTS);
