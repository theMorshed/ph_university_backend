import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academic_semester_interface";
import { academicSemesterCode, academicSemesterName, Months } from "./academic_semester_constant";

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

academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExists = await AcademicSemesterModel.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterExists) {
        throw new Error("Academic semester is already exists!!");
    }
    next();
})

export const AcademicSemesterModel = model<TAcademicSemester>("Academic Semester", academicSemesterSchema);