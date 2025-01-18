import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicSemesterNameCodeMapper, AcademicSemesterSearchableFields } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) => {

    if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code given!!");
    }

    const result = await AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemesterFromDB = async(query: Record<string, unknown>) => {
    const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
        .search(AcademicSemesterSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
        
    const result = await academicSemesterQuery.modelQuery;
    const meta = await academicSemesterQuery.countTotal();

    return {
        meta,
        result
    }
}

const getSinlgeAcademicSemesterFromDB = async(semesterId: string) => {
    const result = await AcademicSemester.find({_id: semesterId});
    return result;
}


const updateSinlgeAcademicSemesterIntoDB = async(semesterId: string, payload: Partial<TAcademicSemester>) => {
    
    if (payload.name && payload.code && AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code given!!");
    }

    const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload, {new: true});
    return result;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSinlgeAcademicSemesterFromDB,
    updateSinlgeAcademicSemesterIntoDB,
}