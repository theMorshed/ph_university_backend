import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const userRouter = Router();

userRouter.post('/create-student', auth(USER_ROLE.admin), validateRequest(createStudentValidationSchema), userController.createStudent);

userRouter.post('/create-faculty', auth(USER_ROLE.admin), validateRequest(createFacultyValidationSchema), userController.createFaculty);

userRouter.post('/create-admin', validateRequest(createAdminValidationSchema), userController.createAdmin);

export const userRoutes = userRouter;
