import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";

const userRouter = Router();

userRouter.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);

userRouter.post('/create-faculty', validateRequest(createFacultyValidationSchema), userController.createFaculty);

userRouter.post('/create-admin', validateRequest(createAdminValidationSchema), userController.createAdmin);

export const userRoutes = userRouter;
