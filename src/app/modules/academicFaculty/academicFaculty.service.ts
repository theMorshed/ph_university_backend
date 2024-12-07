import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await academicFacultyModel.create(payload);
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await academicFacultyModel.find({});
    return result;
}

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
    const result = await academicFacultyModel.findById(facultyId);
    return result;
}

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = academicFacultyModel.findOneAndUpdate({_id: id}, payload, {new: true});
    return result;
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
}