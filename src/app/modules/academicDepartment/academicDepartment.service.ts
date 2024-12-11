import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllAcademicDepartments = async() => {
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartment = async(departmentId: string) => {
    const result = await AcademicDepartment.findById(departmentId).populate('academicFaculty');
    return result;
}

const updateAcademicDepartment = async(id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true});
    return result;
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}