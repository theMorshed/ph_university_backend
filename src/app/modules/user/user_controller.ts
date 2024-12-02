import { NextFunction, Request, Response } from "express";
import { userService } from "./user_service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createStudent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, student: studentData} = req.body;
        const result = await userService.createStudentIntoDB(password, studentData);
        
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch(err) {
        next(err);
    }
}

export const userController = {
    createStudent,
}