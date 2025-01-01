import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validation";
import { enrolledCourseControllers } from "./enrolledCourse.controller";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/create-enrolled-course', 
    auth(USER_ROLE.student), 
    validateRequest(enrolledCourseValidations.createEnrolledCourseValidationSchema), 
    enrolledCourseControllers.createEnrolledCourse
);

router.patch('/update-enrolled-course-marks', 
    auth(USER_ROLE.admin, USER_ROLE.faculty), 
    validateRequest(enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema), 
    enrolledCourseControllers.updateEnrolledCourseMarks
);

export const enrolledCourseRoutes = router;