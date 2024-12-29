/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { Student } from "../student/student.model";
import EnrolledCourse from "./enrolledCourse.model";
import mongoose from "mongoose";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";

const createEnrolledCourseIntoDB = async (userId: string, payload: TEnrolledCourse) => {
    const { offeredCourse } = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
    }

    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(StatusCodes.BAD_GATEWAY, 'Room is full');
    }

    const student = await Student.findOne({id: userId}, {_id: 1});
    if (!student) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id
    })
    if (isStudentAlreadyEnrolled) {
        throw new AppError(StatusCodes.CONFLICT, 'Student is already enrolled');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const result = await EnrolledCourse.create([{
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicSemester: isOfferedCourseExists.academicSemester,
            academicFaculty: isOfferedCourseExists.academicFaculty,
            academicDepartment: isOfferedCourseExists.academicDepartment,
            offeredCourse: offeredCourse,
            course: isOfferedCourseExists.course,
            student: student._id,
            faculty: isOfferedCourseExists.faculty,
            isEnrolled: true
        }], {session})

        if (!result) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to enroll this course');
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;
        await OfferedCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity - 1
        }, {session})

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

const updateEnrolledCourseMarksIntoDB = async(facultyId: string, payload: Partial<TEnrolledCourse>) => {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Semester Registration not found');
    }

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found');
    }

    const isStudentExists = await Student.findById(student);
    if (!isStudentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
    }

    const faculty = await Faculty.findOne({id: facultyId}, {_id: 1});
    if (!faculty) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found');
    }

    const isCourseBelongToFaculty = await EnrolledCourse.findOne({ semesterRegistration, offeredCourse, student, faculty: faculty._id });
    if (!isCourseBelongToFaculty) {
        throw new AppError(StatusCodes.FORBIDDEN, 'You are forbidden!');
    }

    const modifiedData: Record<string, unknown> = {
        ...courseMarks
    };

    if (courseMarks?.finalTerm) {
        const { classTest1, midTerm, classTest2, finalTerm } = isCourseBelongToFaculty.courseMarks;

        const totalMarks = Math.ceil(classTest1 * 0.1) + Math.ceil(midTerm * 0.3) + Math.ceil(classTest2 * 0.1) + Math.ceil(finalTerm * 0.5);

        const result = calculateGradeAndPoints(totalMarks);

        modifiedData.grade = result.grade;
        modifiedData.gradePoint = result.gradePoint;
        modifiedData.isCompleted = true;
    }
    
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }

    const result = await EnrolledCourse.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, { new: true });

    return result;
}

export const enrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}