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

const getAllAcademicSemesterFromDB = async() => {
    const result = await AcademicSemesterModel.find({});
    return result;
}

const getSinlgeAcademicSemesterFromDB = async(semesterId: string) => {
    const result = await AcademicSemesterModel.find({_id: semesterId});
    return result;
}


const updateSinlgeAcademicSemesterIntoDB = async(semesterId: string, payload: Partial<TAcademicSemester>) => {
    
    if (payload.name && payload.code && AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code given!!");
    }

    const result = await AcademicSemesterModel.findByIdAndUpdate(semesterId, payload, {new: true});
    return result;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSinlgeAcademicSemesterFromDB,
    updateSinlgeAcademicSemesterIntoDB,
}