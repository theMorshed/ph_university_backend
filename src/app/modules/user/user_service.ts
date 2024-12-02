import config from "../../config";
import { TStudent } from "../student/student_interface";
import { StudentModel } from "../student/student_model";
import { TUser } from "./user_interface";
import { userModel } from "./user_model";

const createStudentIntoDB = async(password: string, studentData: TStudent) => {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password) as string;
    userData.role = 'student';
    userData.id = '2030100001';

    const newUser = await userModel.create(userData);
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }
}

export const userService = {
    createStudentIntoDB,
}