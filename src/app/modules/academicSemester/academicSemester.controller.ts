import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req, res) => {
    
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester created successfully',
        data: result
    })
})

const getAllAcademicSemesters = catchAsync(async(req, res) => {
    const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semesters retrieved successfully',
        data: result
    })
})

const getSingleAcademicSemesters = catchAsync(async(req, res) => {
    const semesterId = req.params.semesterId;
    const result = await academicSemesterServices.getSinlgeAcademicSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester retrieved successfully',
        data: result
    })
})

const updateSingleAcademicSemesters = catchAsync(async(req, res) => {
    const semesterId = req.params.semesterId;
    const updateSemester = req.body;
    const result = await academicSemesterServices.updateSinlgeAcademicSemesterIntoDB(semesterId, updateSemester);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester Updated successfully',
        data: result
    })
})

export const academicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemesters,
    updateSingleAcademicSemesters,
}