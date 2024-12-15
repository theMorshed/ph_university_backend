/**
 * Importing required modules and services:
 * - `StatusCodes`: Provides standard HTTP status codes for responses.
 * - `catchAsync`: A utility to handle asynchronous errors in controllers.
 * - `sendResponse`: Formats and sends consistent API responses.
 * - `academicFacultyServices`: Contains business logic for managing academic faculty operations.
 */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

/**
 * Handles the creation of a new academic faculty.
 * 
 * @route POST /academic-faculty
 * @access Public
 */
const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
    });
});

/**
 * Retrieves all academic faculties from the database.
 * 
 * @route GET /academic-faculty
 * @access Public
 */
const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculties retrieved successfully',
        data: result,
    });
});

/**
 * Retrieves a single academic faculty by its ID.
 * 
 * @route GET /academic-faculty/:facultyId
 * @access Public
 */
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const facultyId = req.params.facultyId;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty retrieved successfully',
        data: result,
    });
});

/**
 * Updates an existing academic faculty by its ID.
 * 
 * @route PATCH /academic-faculty/:facultyId
 * @access Public
 */
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const facultyId = req.params.facultyId;
    const updateFaculty = req.body;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(facultyId, updateFaculty);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
    });
});

/**
 * Exporting academic faculty controllers:
 * - `createAcademicFaculty`: Handles faculty creation.
 * - `getAllAcademicFaculties`: Retrieves all faculties.
 * - `getSingleAcademicFaculty`: Retrieves a single faculty by ID.
 * - `updateAcademicFaculty`: Updates faculty data by ID.
 */
export const academicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};