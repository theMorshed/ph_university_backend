import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    id: string;
    email: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    role: 'super-admin' | 'student' | 'faculty' | 'admin';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(userPassword: string, hashedPassword: string): boolean;
    isDeleted(id: string): boolean;
    status(id: string): string;
    isJWTIssuedBeforePasswordChange(passwordChangedAt: Date, jwtIssuedAt: number): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
