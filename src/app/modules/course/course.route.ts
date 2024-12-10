import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";

const courseRouter = Router();

courseRouter.post('/create-course', validateRequest(courseValidations.createCourseValidationSchema), courseControllers.createCourse);

courseRouter.get('/', courseControllers.getAllCourses);
courseRouter.get('/:courseId', courseControllers.getSingleCourse);

courseRouter.patch('/:courseId', validateRequest(courseValidations.updateCourseValidationSchema), courseControllers.updateCourse);
courseRouter.delete('/:courseId', courseControllers.deleteCourse);

courseRouter.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseControllers.assignFacultiesWithCourse);
courseRouter.delete('/:courseId/remove-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseControllers.removeFacultiesWithCourse);

export const courseRoutes = courseRouter;