import { TAcademicSemester } from "./academic_semester_interface";
import { AcademicSemesterModel } from "./academic_semester_model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) => {
    const result = await AcademicSemesterModel.create(payload);
    return result;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
}