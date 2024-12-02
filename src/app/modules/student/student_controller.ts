import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student_service";

const getAllStudents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'All students fetch successfully',
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
        res.status(200).json({
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