import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";

const semesterRegistrationRouter = Router();

semesterRegistrationRouter.post('/create-semester-registration', validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration);

semesterRegistrationRouter.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);
semesterRegistrationRouter.get('/:semesterId', semesterRegistrationControllers.getSingleSemesterRegistrations);

export const semesterRegistrationRoutes = semesterRegistrationRouter;