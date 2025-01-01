import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/create-semester-registration', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), 
    semesterRegistrationControllers.createSemesterRegistration
);

router.get('/', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    semesterRegistrationControllers.getAllSemesterRegistrations
);

router.get('/:id', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    semesterRegistrationControllers.getSingleSemesterRegistrations
);

router.patch('/:id', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema), 
    semesterRegistrationControllers.updateSemesterRegistration
);

export const semesterRegistrationRoutes = router;