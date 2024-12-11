import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { semesterRegistrationStatusObj } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester;

    //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            {status: 'UPCOMING'},
            {status: 'ONGING'}
        ]
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(StatusCodes.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!!`);
    }

    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
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

const updateSemesterRegistrationIntoDB = async(id: string, payload: Partial<TSemesterRegistration>) => {
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

    if (!isSemesterRegistrationExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The semester is not found');
    }

    const currentSemesterStatus = isSemesterRegistrationExists.status;
    const requestedStatus = payload?.status;

    if (currentSemesterStatus === semesterRegistrationStatusObj.ENDED) {
        throw new AppError(StatusCodes.BAD_REQUEST, `The semester is already ${currentSemesterStatus}`);
    }

    if (currentSemesterStatus === semesterRegistrationStatusObj.UPCOMING && requestedStatus === semesterRegistrationStatusObj.ENDED) {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }

    if ( currentSemesterStatus === semesterRegistrationStatusObj.ONGOING && requestedStatus === semesterRegistrationStatusObj.UPCOMING ) {
        throw new AppError( StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}` );
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    return result;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
}