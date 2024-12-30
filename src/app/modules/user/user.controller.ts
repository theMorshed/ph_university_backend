import { userServices } from "./user.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async(req, res) => {
    const {password, student: studentData} = req.body;
    const result = await userServices.createStudentIntoDB(req.file, password, studentData);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student created successfully',
        data: result
    })
})

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await userServices.createFacultyIntoDB(req.file, password, facultyData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await userServices.createAdminIntoDB(req.file, password, adminData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

const getMe = catchAsync(async (req, res) => {
    const { userId, role } = req.user;

    const result = await userServices.getMeService(userId, role);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User get succesfully',
        data: result,
    });
});

const changeStatus = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await userServices.changeStatusService(id, req.body);

    console.log(req.file);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User status change succesfully',
        data: result,
    });
});

export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
}