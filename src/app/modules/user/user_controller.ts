import { userService } from "./user_service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async(req, res) => {
    const {password, student: studentData} = req.body;
    const result = await userService.createStudentIntoDB(password, studentData);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student created successfully',
        data: result
    })
})

export const userController = {
    createStudent,
}