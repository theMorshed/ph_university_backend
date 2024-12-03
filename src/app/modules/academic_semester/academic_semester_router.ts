import { Router } from "express";
import { academicSemesterControllers } from "./academic_semester_controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academic_semester_validation";

const academicSemesterRouter = Router();

academicSemesterRouter.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester);

academicSemesterRouter.get('/', academicSemesterControllers.getAllAcademicSemesters);
academicSemesterRouter.get('/:semesterId', academicSemesterControllers.getSingleAcademicSemesters);
academicSemesterRouter.patch('/:semesterId', validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemesterControllers.updateSingleAcademicSemesters);

export const academicSemesterRoutes = academicSemesterRouter;