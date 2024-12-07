import { Router } from "express";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";

const academicDepartmentRouter = Router();

academicDepartmentRouter.post('/create-academic-department', validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema), academicDepartmentControllers.createAcademicDepartment);

academicDepartmentRouter.get('/', academicDepartmentControllers.getAllAcademicDepartments);
academicDepartmentRouter.get('/:departmentId', academicDepartmentControllers.getSingleAcademicDepartment);

academicDepartmentRouter.patch('/:departmentId', validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema),  academicDepartmentControllers.updateAcademicDepartment);

export const academicDepartmentRoutes = academicDepartmentRouter;