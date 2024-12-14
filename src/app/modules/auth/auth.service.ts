import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUserService = async (payload: TLoginUser) => {
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

export const authServices = {
    loginUserService
}