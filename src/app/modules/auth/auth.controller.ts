import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async(req, res) => {
    const result = await authServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User Logged in successfully',
        data: result
    })
})

const changePassword = catchAsync(async(req, res) => {
    const {...passwordData} = req.body;
    const result = await authServices.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Change password successfully',
        data: result
    })
})

export const authControllers = {
    loginUser,
    changePassword
}