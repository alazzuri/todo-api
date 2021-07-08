import { Router } from "express";
import { getUsers, loginUser, registerUser } from "../controller/user/index.js";

const router = Router();

router.post("/v1/users/", registerUser);

router.post("/v1/users/login", loginUser);

router.get("/v1/private/users", getUsers);

export default router;
