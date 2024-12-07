import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/appError";
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
    const isDepartmentExists = await academicDepartmentModel.findOne({name: this.name});
    if (isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department already exists');
    }

    next();
})

academicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
    const query = this.getQuery();
    const isDepartmentExists = await academicDepartmentModel.findOne(query);

    if (!isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department doesn\'t exists');
    }
    
    next();
})

export const academicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);