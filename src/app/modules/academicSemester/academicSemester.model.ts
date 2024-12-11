import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, Months } from "./academicSemester.constant";

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
    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterExists) {
        throw new Error("Academic semester is already exists!!");
    }
    next();
})

export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema);