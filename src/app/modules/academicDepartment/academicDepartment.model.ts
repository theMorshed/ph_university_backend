/*
 * Importing modules for defining the academic department model and handling errors:
 * 
 * - `model`, `Schema`: Used to define and create Mongoose schema and model for academic department.
 * - `TAcademicDepartment`: TypeScript type for the academic department.
 * - `AppError`: Custom error class for throwing application-specific errors.
 * - `StatusCodes`: Provides standard HTTP status codes for error handling.
 */
import { model, Schema } from "mongoose"; 
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError"; 
import { StatusCodes } from "http-status-codes";


// Defining the schema for the AcademicDepartment model with type safety provided by TAcademicDepartment.
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        /*
        * `name`: The unique name of the academic department.
        * 
        * - `type`: Specifies the data type as a string.
        * - `required`: Ensures the name is provided for every department.
        * - `unique`: Guarantees the name is unique across all departments.
        */
        name: {
            type: String,
            required: true,
            unique: true,
        },
        /*
        * `academicFaculty`: A reference to the academic faculty associated with the department.
        * 
        * - `type`: Defines the data type as `ObjectId`, referencing a document in another collection.
        * - `required`: Ensures that an academic faculty reference is provided.
        * - `ref`: Specifies the collection being referenced (`AcademicFaculty`).
        */
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicFaculty',
        },
    },
    {
        // Enables automatic management of createdAt and updatedAt timestamps for each document.
        timestamps: true,
    }
);

/*
 * Pre-save middleware to ensure the uniqueness of the department name before saving.
 * 
 * - Checks if a department with the same name already exists in the database.
 * - Throws an error if the department name is not unique.
 * - If unique, the save operation proceeds.
 */
academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartment.findOne({ name: this.name });
    if (isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department already exists');
    }
    next();
});

/*
 * Pre-findOneAndUpdate middleware to ensure the department exists before updating.
 * 
 * - Retrieves the query being executed to check if the department exists.
 * - Throws an error if no department matches the query.
 * - If found, the update operation proceeds.
 */
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department does not exist');
    }
    next();
});

/*
 * Creating and exporting the `AcademicDepartment` model.
 * 
 * - This model is used to interact with the `AcademicDepartment` collection in MongoDB.
 */
export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);