import config from "../../app/config";
import { TStudent } from "../student/student_interface";
import { TUser } from "./user_interface";
import { userModel } from "./user_model";

const createStudentIntoDB = async(password: string, studentData: TStudent) => {
    const user: Partial<TUser> = {};
    user.password = password || (config.default_password) as string;
    user.role = 'student';
    user.id = '2030100001';

    const result = await userModel.create(user);
    if (Object.keys(result).length) {
        studentData.id = result.id;
        studentData.user = result._id;
    }
}

export const userService = {
    createStudentIntoDB,
}