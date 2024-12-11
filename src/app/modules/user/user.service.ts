/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async(password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password) as string;
    userData.role = 'student';

    // find academicSemester
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

    const session = await startSession();

    try {
        session.startTransaction();
        
        if (admissionSemester) {
            userData.id = await generateStudentId(admissionSemester);
        }

        // transaction 1
        const newUser = await User.create([userData], {session});
        if (!newUser.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create new user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // transaction 2
        const newStudent = await Student.create([payload], {session});
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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); 

        //create a admin
        if (!newUser.length) {
             throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const userServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
}