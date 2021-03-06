import env from "dotenv";

env.config();

export const enviroment = {
  PORT: Number(process.env.PORT),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
};
