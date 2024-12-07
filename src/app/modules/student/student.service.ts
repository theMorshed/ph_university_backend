/* eslint-disable @typescript-eslint/no-unused-vars */
import { startSession } from "mongoose";
import { StudentModel } from "./student.model"
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../user/user.model";

const getAllStudentsFromDB = async() => {
    const result = await StudentModel.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}

const getSingleStudentFromDB = async(id: string) => {
    const result = await StudentModel.findById(id).populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    // Check if the student exists
    const studentExists = await StudentModel.isStudentExists(id);

    if (!studentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student does not exists');
    }

    const session = await startSession();

    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
        }

        const deletedUser = await userModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
}