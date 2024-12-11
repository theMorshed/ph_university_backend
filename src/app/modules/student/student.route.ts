import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const studentRouter = express.Router();
studentRouter.get('/', StudentControllers.getAllStudents);
studentRouter.get('/:id', StudentControllers.getSingleStudent);
studentRouter.patch('/:id', validateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
studentRouter.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = studentRouter;