import { Router } from "express";
import { setup, serve } from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const router = Router();

router.use("/api-docs", serve);
router.get("/api-docs", setup(swaggerDocument));

export default router;
