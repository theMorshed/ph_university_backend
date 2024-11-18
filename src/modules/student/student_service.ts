import { TStudent } from "./student_interface"
import { StudentModel } from "./student_model"

const createStudentIntoDB = async(student: TStudent) => {
    const result = await StudentModel.create(student);
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
}