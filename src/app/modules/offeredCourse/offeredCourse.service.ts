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
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime } = payload;

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

    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: {$in: days}
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(StatusCodes.CONFLICT, 'This Faculty is not availabe at that time, Choose other time or day');
    }

    const result = OfferedCourse.create({...payload, academicSemester});
    return result;
}

const getAllOfferedCoursesFromDB = async(query: Record<string, unknown>) => {
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

const updateOfferedCourseIntoDB = async(id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {
    const {faculty, days, startTime, endTime} = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This offered course does not exists');
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty does not exists');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`);
    }

    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: {$in: days}
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(StatusCodes.CONFLICT, 'This Faculty is not availabe at that time, Choose other time or day');
    }

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {new: true});
    return result;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}