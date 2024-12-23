import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";

const router = Router();

router.post('/create-offered-course', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse);

router.patch('/:id', validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema), offeredCourseControllers.updateOfferedCourse);

router.get('/', offeredCourseControllers.getAllOfferedCourses);

router.get('/:id', offeredCourseControllers.getSingleOfferedCourse);

export const offeredCourseRoutes = router;