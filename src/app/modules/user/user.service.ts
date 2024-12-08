/* eslint-disable @typescript-eslint/no-unused-vars */
import { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createStudentIntoDB = async(password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password) as string;
    userData.role = 'student';

    // find academicSemester
    const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester);

    const session = await startSession();

    try {
        session.startTransaction();
        
        if (admissionSemester) {
            userData.id = await generateStudentId(admissionSemester);
        }

        // transaction 1
        const newUser = await userModel.create([userData], {session});
        if (!newUser.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create new user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // transaction 2
        const newStudent = await StudentModel.create([payload], {session});
        if (!newStudent.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create new student');
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;
    } catch(err) {
        await session.abortTransaction();
        await session.endSession();

        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student and user');
    }
}

export const userService = {
    createStudentIntoDB,
}