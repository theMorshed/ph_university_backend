import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { RequestHandler } from "express";

const getAllStudents: RequestHandler = catchAsync(async(req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student retrieved successfully',
        data: result
    })
})

const getSingleStudent = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Student - ${id} retrieved successfully`,
        data: result
    })
})

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student is deleted succesfully',
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}