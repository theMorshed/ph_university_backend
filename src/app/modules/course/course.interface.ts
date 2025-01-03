import { Types } from "mongoose";

export type TPreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted?: boolean;
    prerequisiteCourses: [TPreRequisiteCourses];
}

export type TCourseFaculty = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}