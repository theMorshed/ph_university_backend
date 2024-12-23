import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";

const router = Router();

router.post('/create-course', validateRequest(courseValidations.createCourseValidationSchema), courseControllers.createCourse);

router.get('/', courseControllers.getAllCourses);
router.get('/:courseId', courseControllers.getSingleCourse);

router.patch('/:courseId', validateRequest(courseValidations.updateCourseValidationSchema), courseControllers.updateCourse);
router.delete('/:courseId', courseControllers.deleteCourse);

router.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseControllers.assignFacultiesWithCourse);
router.delete('/:courseId/remove-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseControllers.removeFacultiesWithCourse);

export const courseRoutes = router;