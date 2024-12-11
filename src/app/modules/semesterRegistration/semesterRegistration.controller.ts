import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async(req, res) => {
    
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester registered successfully',
        data: result
    })
})

const getAllSemesterRegistrations = catchAsync(async(req, res) => {
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'All Semester Registration is retrieved successfully !',
        data: result,
    });
});

const getSingleSemesterRegistrations = catchAsync(async(req, res) => {
    const {semesterId} = req.params;
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(semesterId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully !',
        data: result,
    });
});

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistrations,
}