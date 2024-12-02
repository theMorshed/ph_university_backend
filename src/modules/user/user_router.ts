import { Router } from "express";
import { userController } from "./user_controller";

const userRouter = Router();
userRouter.post('/create-student', userController.createStudent);

export const userRoutes = userRouter;
