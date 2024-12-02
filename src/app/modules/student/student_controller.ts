import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student_service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllStudents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    }catch(error) {
        next(error);
    }
}

const getSingleStudent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {studentId} = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: `Student - ${studentId} retrieved successfully`,
            data: result
        })
    }catch(error) {
        next(error)
    }
}

export const StudentControllers = {
    getAllStudents,
    getSingleStudent
}