import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError";
import { OfferedCourse } from "./offeredCourse.model"
import { TOfferedCourse } from "./offeredCourse.interface";

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {
    const result = OfferedCourse.create(payload);
    return result;
}

const getAllOfferedCourseFromDB = async(query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
}

const getSingleOfferedCourseFromDB = async(id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);
    if (!offeredCourse) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
    }

    return offeredCourse;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB
}