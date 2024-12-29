import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { facultyRoutes } from "../modules/faculty/faculty.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { enrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.routes";

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
        path: '/admins',
        route: adminRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourseRoutes
    }
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
