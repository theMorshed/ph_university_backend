import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUserService = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
    }

    const isDeletedUser = user?.isDeleted;
    if (isDeletedUser) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked.');
    }

    return {};
}

export const authServices = {
    loginUserService
}