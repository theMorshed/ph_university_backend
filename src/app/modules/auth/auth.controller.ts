import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async(req, res) => {
    const result = await authServices.loginUser(req.body);
    const { accessToken, refreshToken, needsPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User Logged in successfully',
        data: {
            accessToken,
            needsPasswordChange
        }
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

const refreshToken = catchAsync(async(req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Access token retrieved successfully',
        data: result
    })
})

const forgetPassword = catchAsync(async(req, res) => {
    const result = await authServices.forgetPasswordService(req.body.id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Forget password link sent successfully',
        data: result
    })
})

export const authControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword
}