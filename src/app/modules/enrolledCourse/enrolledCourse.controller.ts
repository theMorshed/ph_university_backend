import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async(req, res) => {
    const userId = req.user.userId;
    const result = await enrolledCourseServices.createEnrolledCourseIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Student is enrolled successfully',
        data: result
    })
})

export const enrolledCourseControllers = {
    createEnrolledCourse
}