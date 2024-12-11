import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError";
import { OfferedCourse } from "./offeredCourse.model"
import { TOfferedCourse } from "./offeredCourse.interface";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, section, faculty } = payload;

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Semester registration not found');
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Faculty not found');
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department not found');
    }

    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Course is not found');
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty is not found');
    }

    const isDepartmentBelongsFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty
    })
    if (!isDepartmentBelongsFaculty) {
        throw new AppError(StatusCodes.NOT_FOUND, `This ${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`);
    }

    const isSameOfferedCourseExistsWithSameRegisteredCourseWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })
    if (isSameOfferedCourseExistsWithSameRegisteredCourseWithSameSection) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Offered course with same section is already exists');
    }

    const result = OfferedCourse.create({...payload, academicSemester});
    return result;
}

const getAllOfferedCourseFromDB = async(query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
}

const getSingleOfferedCourseFromDB = async(id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);
    if (!offeredCourse) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
    }

    return offeredCourse;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB
}