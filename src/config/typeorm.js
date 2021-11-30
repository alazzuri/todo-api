import typeorm from "typeorm";
import { TaskEntity } from "../entities/task.js";
import { UserEntity } from "../entities/user.js";
import { enviroment } from "./enviroment.js";

const { createConnection } = typeorm;

const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME, IS_PRODUCTION } =
  enviroment;

export async function connect() {
  await createConnection({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [UserEntity, TaskEntity],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
  });

  console.log(`Database connected ✅`);
}
