import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";

const userRouter = Router();

userRouter.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);

userRouter.post('/create-faculty', validateRequest(createFacultyValidationSchema), userController.createFaculty);

export const userRoutes = userRouter;
