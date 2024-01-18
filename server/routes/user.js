import { Router } from "express";

import userContollers from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/register", userContollers.register);
userRouter.post("/login", userContollers.login);
userRouter.get("/logout", userContollers.logout);

export default userRouter;