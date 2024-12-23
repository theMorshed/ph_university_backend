import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";
import { changeStatusValidationSchema } from "./user.validation";

const router = Router();

router.post('/create-student', auth(USER_ROLE.admin), validateRequest(createStudentValidationSchema), userController.createStudent);

router.post('/create-faculty', auth(USER_ROLE.admin), validateRequest(createFacultyValidationSchema), userController.createFaculty);

router.post('/create-admin', validateRequest(createAdminValidationSchema), userController.createAdmin);

router.get('/me', auth('student', 'faculty', 'admin'), userController.getMe);

router.patch('/change-status/:id', auth('admin'), validateRequest(changeStatusValidationSchema), userController.changeStatus);

export const userRoutes = router;
