import express from "express";
import CORS from "cors";
import userRouter from "../routes/user.routes.js";
import taskRoutes from "../routes/task.routes.js";
import { connect } from "../config/typeorm.js";
import { enviroment } from "../config/enviroment.js";

(async function main() {
  const server = express();
  server.use(express.json(), CORS());
  const port = enviroment?.PORT;

  //SET UP SERVER
  server.listen(port, () => {
    console.log(`Server started on port ${port} 🚀🚀🚀`);
  });

  await connect();

  // USERS
  server.use(userRouter);
  server.use(taskRoutes);

  // server.post("/v1/users/", (req, res) => {
  //   const { createdUserId } = req;
  //   res.status(201).json({ userId: createdUserId });
  // });

  // server.post("/v1/users/login", (req, res) => {
  //   const { jwtToken } = req;
  //   const loginResponse = { token: jwtToken };
  //   res.status(200).json(loginResponse);
  // });
})();
