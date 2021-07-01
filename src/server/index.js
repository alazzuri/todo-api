import express from "express";
import CORS from "cors";
import userRouter from "../routes/user.routes.js";
import taskRoutes from "../routes/task.routes.js";
import docsRoutes from "../routes/docs.routes.js";
import { connect } from "../config/typeorm.js";
import { enviroment } from "../config/enviroment.js";

(async function main() {
  try {
    const server = express();
    server.use(express.json(), CORS());
    const port = enviroment?.PORT;

    // SET UP SERVER
    server.listen(port, () => {
      console.log(`Server started on port ${port} 🚀🚀🚀`);
    });

    // DB CONNECTIOn
    await connect();

    // ROUTERS
    server.use(userRouter);
    server.use(taskRoutes);
    server.use(docsRoutes);
  } catch (err) {
    console.log(err);
  }
})();
