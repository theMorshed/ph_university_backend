import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/create-course', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(courseValidations.createCourseValidationSchema), 
    courseControllers.createCourse
);

router.get('/', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    courseControllers.getAllCourses
);

router.get('/:courseId', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    courseControllers.getSingleCourse
);

router.patch('/:courseId', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(courseValidations.updateCourseValidationSchema), 
    courseControllers.updateCourse
);

router.delete('/:courseId', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    courseControllers.deleteCourse
);

router.put('/:courseId/assign-faculties', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(courseValidations.facultiesWithCourseValidationSchema),
    courseControllers.assignFacultiesWithCourse
);

router.delete('/:courseId/remove-faculties',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin), 
    validateRequest(courseValidations.facultiesWithCourseValidationSchema), 
    courseControllers.removeFacultiesWithCourse
);

export const courseRoutes = router;