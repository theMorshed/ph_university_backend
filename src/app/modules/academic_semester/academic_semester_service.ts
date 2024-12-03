import { AcademicSemesterNameCodeMapper } from "./academic_semester_constant";
import { TAcademicSemester } from "./academic_semester_interface";
import { AcademicSemesterModel } from "./academic_semester_model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) => {

    if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code given!!");
    }

    const result = await AcademicSemesterModel.create(payload);
    return result;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
}