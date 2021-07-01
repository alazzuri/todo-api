import { Router } from "express";
import { setup, serve } from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const router = Router();

router.use("/", serve);
router.get("/", setup(swaggerDocument));

export default router;
