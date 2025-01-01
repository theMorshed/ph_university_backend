import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/create-academic-semester',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), 
    academicSemesterControllers.createAcademicSemester
);

router.get('/', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    academicSemesterControllers.getAllAcademicSemesters
);

router.get('/:semesterId', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    academicSemesterControllers.getSingleAcademicSemesters
);

router.patch('/:semesterId', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema), 
    academicSemesterControllers.updateSingleAcademicSemesters
);

export const academicSemesterRoutes = router;