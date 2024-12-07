import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
    const result = await academicDepartmentModel.create(payload);
    return result;
}

const getAllAcademicDepartments = async() => {
    const result = await academicDepartmentModel.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartment = async(departmentId: string) => {
    const result = await academicDepartmentModel.findById(departmentId).populate('academicFaculty');
    return result;
}

const updateAcademicDepartment = async(id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await academicDepartmentModel.findOneAndUpdate({_id: id}, payload, {new: true});
    return result;
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}