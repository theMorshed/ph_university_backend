import express from "express";
import { StudentControllers } from "./student_controller";

const studentRouter = express.Router();
studentRouter.post('/create-student', StudentControllers.createStudent);
studentRouter.get('/', StudentControllers.getAllStudents);
studentRouter.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = studentRouter;