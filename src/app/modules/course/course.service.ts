/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

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

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {new: true, runValidators: true});
    
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
        const deletedPreRequisites = prerequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);

        const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, 
            { $pull: {prerequisiteCourses: {course: {$in: deletedPreRequisites}}}}
        )

        const newPrerequisite = prerequisiteCourses.filter(el => el.course && !el.isDeleted);

        const newPrerequisiteCourses = await Course.findByIdAndUpdate(id, 
            {$addToSet: {prerequisiteCourses: {$each: newPrerequisite}}}
        )
    }

    const result = await Course.findById(id).populate('prerequisiteCourses.course');

    return result;
}

const deleteCourseFromDB = async(id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return result;
}

export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
}