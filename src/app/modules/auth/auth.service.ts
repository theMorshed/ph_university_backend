import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";
import jwt from 'jsonwebtoken';
import { sendMail } from "../../utils/sendMails";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    if ((await User.isDeleted(user.id))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    if (await User.status(user.id) === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }
   
    const passwordCompare = await User.isPasswordMatched(payload.password, user.password);
    if(!passwordCompare) {
        throw new AppError(StatusCodes.NOT_FOUND, 'You have got a wrong password');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);

    return {accessToken, refreshToken, needsPasswordChange: user.needsPasswordChange};
}

const changePassword = async (userData: JwtPayload, payload: {oldPassword: string, newPassword: string}) => {
    const user = await User.isUserExistsByCustomId(userData.userId);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    if ((await User.isDeleted(user.id))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    if (await User.status(user.id) === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }
   
    const passwordCompare = await User.isPasswordMatched(payload.oldPassword, user.password);
    if(!passwordCompare) {
        throw new AppError(StatusCodes.NOT_FOUND, 'You have got a wrong password');
    }

    // hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

    await User.findOneAndUpdate(
        {
            id: userData.userId,
            role: userData.role
        },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date()
        }
    )

    return null;
}

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    if ((await User.isDeleted(user.id))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    if (await User.status(user.id) === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }
   
    if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
}

const forgetPasswordService = async(userId: string) => {
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    if ((await User.isDeleted(user.id))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    if (await User.status(user.id) === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '10m',
    );

    const resetLink = `${config.reset_password_ui_link}?id=${user.id}&token=${accessToken}`;
    sendMail(user.email, resetLink);
}

const resetPasswordService = async(payload: { id: string, newPassword: string }, token: string) => {
    const user = await User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    if ((await User.isDeleted(user.id))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    if (await User.status(user.id) === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    if (payload.id !== decoded.userId) {
        throw new AppError(StatusCodes.FORBIDDEN, 'You are not allowed to access');
    }

    // hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

    await User.findOneAndUpdate(
        {
            id: decoded.userId,
            role: decoded.role
        },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date()
        }
    )
}

export const authServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPasswordService,
    resetPasswordService
}