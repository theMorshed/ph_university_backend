import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async(req, res) => {
    
    const result = await courseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course created successfully',
        data: result
    })
})

const getAllCourses = catchAsync(async(req, res) => {
    const result = await courseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All Courses retrieved successfully',
        data: result
    })
})

const getSingleCourse = catchAsync(async(req, res) => {
    const courseId = req.params.courseId;
    const result = await courseServices.getSingleCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course retrieved successfully',
        data: result
    })
})

const updateCourse = catchAsync(async(req, res) => {
    const courseId = req.params.courseId;
    const result = await courseServices.updateCourseIntoDB(courseId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course updated successfully',
        data: result
    })
})

const deleteCourse = catchAsync(async(req, res) => {
    const courseId = req.params.courseId;
    const result = await courseServices.deleteCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course deleted successfully',
        data: result
    })
})

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse
}