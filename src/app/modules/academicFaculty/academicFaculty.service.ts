import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find({});
    return result;
}

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
    const result = await AcademicFaculty.findById(facultyId);
    return result;
}

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = AcademicFaculty.findOneAndUpdate({_id: id}, payload, {new: true});
    return result;
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
}