import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await offeredCourseServices.updateOfferedCourseIntoDB(id, payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async(req, res) => {
    const result = await offeredCourseServices.getAllOfferedCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All Offerd Courses is retrieved successfully !',
        data: result,
    });
});

const getSingleOfferedCourse = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered Course is retrieved successfully !',
        data: result,
    });
});

export const offeredCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse
}