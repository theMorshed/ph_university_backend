import { Router } from "express";
import { StudentRoutes } from "../modules/student/student_router";
import { userRoutes } from "../modules/user/user_router";
import { academicSemesterRoutes } from "../modules/academic_semester/academic_semester_router";

const router = Router();

const appRoutes = [
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRoutes,
    }
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
