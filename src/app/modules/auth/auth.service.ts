import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';

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
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {expiresIn: '10d'});

    return {accessToken, needsPasswordChange: user.needsPasswordChange};
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

export const authServices = {
    loginUser,
    changePassword
}