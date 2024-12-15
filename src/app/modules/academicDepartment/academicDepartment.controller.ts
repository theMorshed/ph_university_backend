/*
 * Importing modules for handling academic department operations:
 * 
 * - `StatusCodes`: Provides standard HTTP status codes for API responses.
 * - `catchAsync`: A utility to handle async errors in controller functions.
 * - `sendResponse`: Formats and sends consistent API responses.
 * - `academicDepartmentServices`: Contains business logic for managing academic departments.
 */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";

/**
 * Controller to create a new academic department.
 * Handles the request to create a new department in the database.
 */
const createAcademicDepartment = catchAsync(async (req, res) => {
    // Call the service to create the department using the request body data
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    // Send the response with the success message and created department data
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result
    });
});

/**
 * Controller to get all academic departments.
 * Handles the request to retrieve all departments from the database.
 */
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    // Call the service to get all academic departments
    const result = await academicDepartmentServices.getAllAcademicDepartments();

    // Send the response with the success message and retrieved departments data
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Departments retrieved successfully',
        data: result
    });
});

/**
 * Controller to get a single academic department by its ID.
 * Handles the request to retrieve a specific department using the department ID.
 */
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    // Extract department ID from the request parameters
    const departmentId = req.params.departmentId;

    // Call the service to get the department by its ID
    const result = await academicDepartmentServices.getSingleAcademicDepartment(departmentId);

    // Send the response with the success message and the retrieved department data
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department retrieved successfully',
        data: result
    });
});

/**
 * Controller to update an academic department by its ID.
 * Handles the request to update an existing department's details.
 */
const updateAcademicDepartment = catchAsync(async (req, res) => {
    // Extract department ID from the request parameters
    const departmentId = req.params.departmentId;

    // Get the update data from the request body
    const updateFaculty = req.body;

    // Call the service to update the department with the new data
    const result = await academicDepartmentServices.updateAcademicDepartment(departmentId, updateFaculty);

    // Send the response with the success message and updated department data
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department Updated successfully',
        data: result
    });
});

// Exporting the controller functions as an object for use in routes
export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
