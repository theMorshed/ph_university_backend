import { Router } from "express";
import { userController } from "./user_controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student_validation";

const userRouter = Router();

userRouter.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);

export const userRoutes = userRouter;
