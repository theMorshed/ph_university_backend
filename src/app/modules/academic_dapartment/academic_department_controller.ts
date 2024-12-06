import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academic_department_service";

const createAcademicDepartment = catchAsync(async(req, res) => {
    
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result
    })
})

const getAllAcademicDepartments = catchAsync(async(req, res) => {
    const result = await academicDepartmentServices.getAllAcademicDepartments();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Departments retrieved successfully',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async(req, res) => {
    const departmentId = req.params.departmentId;
    const result = await academicDepartmentServices.getSingleAcademicDepartment(departmentId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department retrieved successfully',
        data: result
    })
})

const updateAcademicDepartment = catchAsync(async(req, res) => {
    const departmentId = req.params.departmentId;
    const updateFaculty = req.body;
    const result = await academicDepartmentServices.updateAcademicDepartment(departmentId, updateFaculty);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department Updated successfully',
        data: result
    })
})

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}