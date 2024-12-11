import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";

const offeredCourseRouter = Router();

offeredCourseRouter.post('/create-offered-course', offeredCourseControllers.createOfferedCourse);

export const offeredCourseRoutes = offeredCourseRouter;