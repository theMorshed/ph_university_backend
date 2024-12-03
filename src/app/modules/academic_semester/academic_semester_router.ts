import { Router } from "express";
import { academicSemesterControllers } from "./academic_semester_controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academic_semester_validation";

const academicSemesterRouter = Router();

academicSemesterRouter.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester);

export const academicSemesterRoutes = academicSemesterRouter;