import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'student' | 'faculty' | 'admin';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(userPassword: string, hashedPassword: string): boolean;
    isDeleted(id: string): boolean;
    status(id: string): string;
}

export type TUserRole = keyof typeof USER_ROLE;
