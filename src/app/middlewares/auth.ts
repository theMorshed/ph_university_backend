import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized user');
        }

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        
        const {role, userId, iat} = decoded;
        
        // checking if the user is exist
        const user = await User.isUserExistsByCustomId(userId);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
        }
        
        // checking if the user is already deleted
        const isDeleted = user?.isDeleted;

        if (isDeleted) {
            throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
        }

        // checking if the user is blocked
        const userStatus = user?.status;

        if (userStatus === 'blocked') {
            throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
        }

        if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not allowed to doing such kind of task..');
        }                      

        req.user = decoded as JwtPayload;
        next();
    })
}

export default auth;