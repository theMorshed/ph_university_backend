import express from "express";
import { StudentControllers } from "./student.controller";

const studentRouter = express.Router();
studentRouter.get('/', StudentControllers.getAllStudents);
studentRouter.get('/:id', StudentControllers.getSingleStudent);
studentRouter.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = studentRouter;