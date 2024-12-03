import config from "../../config";
import { AcademicSemesterModel } from "../academic_semester/academic_semester_model";
import { TStudent } from "../student/student_interface";
import { StudentModel } from "../student/student_model";
import { TUser } from "./user_interface";
import { userModel } from "./user_model";
import { generateStudentId } from "./user_utils";

const createStudentIntoDB = async(password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password) as string;
    userData.role = 'student';

    // find academicSemester
    const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester);

    if (admissionSemester) {
        userData.id = await generateStudentId(admissionSemester);
    }

    const newUser = await userModel.create(userData);
    if (Object.keys(newUser).length) {
        payload.id = newUser.id;
        payload.user = newUser._id;

        const newStudent = await StudentModel.create(payload);
        return newStudent;
    }
}

export const userService = {
    createStudentIntoDB,
}