import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUserService = async (payload: TLoginUser) => {
    const result = await User.findOne({id: payload.id});
    if (!result) {
        throw new AppError(StatusCodes.FORBIDDEN, 'user does not exists');
    }
    return result;
}

export const authServices = {
    loginUserService
}