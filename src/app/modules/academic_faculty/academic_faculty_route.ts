import { Router } from "express";
import { academicFacultyControllers } from "./academic_faculty_controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidations } from "./academic_faculty_validation";

const academicFacultyRouter = Router();

academicFacultyRouter.post('/create-academic-faculty', validateRequest(academicFacultyValidations.createAcademicFacultyValidationSchema), academicFacultyControllers.createAcademicFaculty);

academicFacultyRouter.get('/', academicFacultyControllers.getAllAcademicFaculties);

academicFacultyRouter.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);

academicFacultyRouter.patch('/:facultyId', validateRequest(academicFacultyValidations.updateAcademicFacultyValidationSchema), academicFacultyControllers.updateAcademicFaculty);

export const academicFacultyRoutes = academicFacultyRouter;