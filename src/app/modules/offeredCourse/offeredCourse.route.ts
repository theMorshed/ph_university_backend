import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";

const offeredCourseRouter = Router();

offeredCourseRouter.post('/create-offered-course', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse);
offeredCourseRouter.patch('/:id', validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema), offeredCourseControllers.updateOfferedCourse);
offeredCourseRouter.get('/', offeredCourseControllers.getAllOfferedCourses);
offeredCourseRouter.get('/:id', offeredCourseControllers.getSingleOfferedCourse);

export const offeredCourseRoutes = offeredCourseRouter;