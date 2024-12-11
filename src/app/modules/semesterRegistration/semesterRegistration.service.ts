import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester;

    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic semester is not exists');
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester});
    if (isSemesterRegistrationExists) {
        throw new AppError(StatusCodes.CONFLICT, 'The semester is already registered');
    }

    const result = await SemesterRegistration.create(payload);

    return result;
}

const getAllSemesterRegistrationFromDB = async(query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = semesterRegistrationQuery.modelQuery;
    return result;
}

const getSingleSemesterRegistrationFromDB = async(id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester');
    return result;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
}