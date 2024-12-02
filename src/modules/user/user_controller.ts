import { NextFunction, Request, Response } from "express";
import { userService } from "./user_service";

const createStudent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, student: studentData} = req.body;
        const result = await userService.createStudentIntoDB(password, studentData);
        return result;
    } catch(err) {
        next(err);
    }
}

export const userController = {
    createStudent,
}