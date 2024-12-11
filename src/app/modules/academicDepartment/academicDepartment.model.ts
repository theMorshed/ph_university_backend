import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty'
    }
}, {
    timestamps: true
});

academicDepartmentSchema.pre('save', async function(next) {
    const isDepartmentExists = await AcademicDepartment.findOne({name: this.name});
    if (isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department already exists');
    }

    next();
})

academicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);

    if (!isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department doesn\'t exists');
    }
    
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);