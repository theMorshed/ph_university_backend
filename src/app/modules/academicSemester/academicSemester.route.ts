import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const academicSemesterRouter = Router();

academicSemesterRouter.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester);

academicSemesterRouter.get('/', academicSemesterControllers.getAllAcademicSemesters);
academicSemesterRouter.get('/:semesterId', academicSemesterControllers.getSingleAcademicSemesters);
academicSemesterRouter.patch('/:semesterId', validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemesterControllers.updateSingleAcademicSemesters);

export const academicSemesterRoutes = academicSemesterRouter;