import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { courseRoutes } from "../modules/course/course.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";

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
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: courseRoutes,
    },
    {
        path: '/faculties',
        route: facultyRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes,
    },
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
