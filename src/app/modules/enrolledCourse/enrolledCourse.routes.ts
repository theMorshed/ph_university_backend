import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validation";
import { enrolledCourseControllers } from "./enrolledCourse.controller";

const router = Router();

router.post('/create-enrolled-course', auth('student'), validateRequest(enrolledCourseValidations.createEnrolledCourseValidationSchema), enrolledCourseControllers.createEnrolledCourse);

router.patch('/update-enrolled-course-marks', auth('faculty'), validateRequest(enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema), enrolledCourseControllers.updateEnrolledCourseMarks);

export const enrolledCourseRoutes = router;