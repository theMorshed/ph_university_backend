import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academic_faculty_service";

const createAcademicFaculty = catchAsync(async(req, res) => {
    
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result
    })
})

const getAllAcademicFaculties = catchAsync(async(req, res) => {
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculties retrieved successfully',
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const facultyId = req.params.facultyId;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty retrieved successfully',
        data: result
    })
})

const updateAcademicFaculty = catchAsync(async(req, res) => {
    const facultyId = req.params.facultyId;
    const updateFaculty = req.body;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(facultyId, updateFaculty);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty Updated successfully',
        data: result
    })
})

export const academicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}