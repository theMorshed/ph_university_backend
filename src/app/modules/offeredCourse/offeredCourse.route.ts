import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";

const offeredCourseRouter = Router();

offeredCourseRouter.post('/create-offered-course', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse);

export const offeredCourseRoutes = offeredCourseRouter;