import { Router } from "express";
import { academicSemesterControllers } from "./academic_semester_controller";

const academicSemesterRouter = Router();

academicSemesterRouter.post('/create-academic-semester', academicSemesterControllers.createAcademicSemester);

export const academicSemesterRoutes = academicSemesterRouter;