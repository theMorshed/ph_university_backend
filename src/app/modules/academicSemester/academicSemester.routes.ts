import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post('/create-academic-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), academicSemesterControllers.createAcademicSemester);

router.get('/', academicSemesterControllers.getAllAcademicSemesters);
router.get('/:semesterId', academicSemesterControllers.getSingleAcademicSemesters);
router.patch('/:semesterId', validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemesterControllers.updateSingleAcademicSemesters);

export const academicSemesterRoutes = router;