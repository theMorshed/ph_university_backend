/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, courseFaculty } from "./course.model"
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createCourseIntoDB = async(payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCoursesFromDB = async(query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('prerequisiteCourses.course'), query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDB = async(id: string) => {
    const result = await Course.findById(id).populate('prerequisiteCourses.course');
    return result;
}

const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>) => {
    const {prerequisiteCourses, ...courseRemainingData} = payload;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, 
            courseRemainingData, 
            {
                new: true, runValidators: true, session
            }
        );

        if (!updateBasicCourseInfo) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course');
        }
    
        if (prerequisiteCourses && prerequisiteCourses.length > 0) {
            const deletedPreRequisites = prerequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);

            const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, 
                { 
                    $pull: {prerequisiteCourses: {course: {$in: deletedPreRequisites}}}
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!deletePreRequisiteCourses) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course');
            }

            const newPrerequisite = prerequisiteCourses.filter(el => el.course && !el.isDeleted);

            const newPrerequisiteCourses = await Course.findByIdAndUpdate(id, 
                {
                    $addToSet: {prerequisiteCourses: {$each: newPrerequisite}}
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!newPrerequisiteCourses) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course');
            }
        }

        await session.commitTransaction();
        await session.endSession();

        const result = await Course.findById(id).populate('prerequisiteCourses.course');

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course');
    }
}

const deleteCourseFromDB = async(id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return result;
}

const assignFacultiesWithCourseIntoDB = async(id: string, payload: Partial<TCourseFaculty>) => {
    const result = await courseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: {faculties: {$each: payload}}
        },
        {
            upsert: true,
            new: true
        }
    );

    return result;
}

const removeFacultiesFromCourseFromDB = async(id: string, payload: Partial<TCourseFaculty>) => {
    const result = await courseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: {faculties: {$in: payload}}
        },
        {
            new: true
        }
    );

    return result;
}

export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB,
}