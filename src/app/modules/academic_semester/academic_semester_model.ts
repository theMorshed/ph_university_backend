import { model, Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academic_semester_interface";

const academicSemesterName: TAcademicSemesterName[] = ["Autumn", "Summer", "Fall"];
const academicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
const Months: TMonths[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: academicSemesterName
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: academicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    }
}, {
    timestamps: true
})

export const AcademicSemester = model<TAcademicSemester>("Academic Semester", academicSemesterSchema);