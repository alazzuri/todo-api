import { Router } from "express";
import { loginUser, registerUser } from "../controller/user/index.js";

const router = Router();

router.post("/v1/users/", registerUser);

router.post("/v1/users/login", loginUser);

export default router;
