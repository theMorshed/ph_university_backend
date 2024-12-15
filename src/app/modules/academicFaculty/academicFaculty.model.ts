/*
 * Importing necessary modules and types:
 * - `model`, `Schema`: From Mongoose to define the schema and create the model.
 * - `TAcademicFaculty`: Type for enforcing type safety in the academic faculty schema.
 */
import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

/*
 * Defining the schema for the academic faculty.
 * 
 * - `name`: The name of the academic faculty (string).
 *   - `required`: Ensures that the name is provided.
 *   - `unique`: Ensures that each academic faculty name is unique.
 * - `timestamps`: Automatically adds `createdAt` and `updatedAt` fields to the document.
 */
const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

/*
 * Creating and exporting the `AcademicFaculty` model.
 * - This model allows interaction with the `AcademicFaculty` collection in MongoDB.
 */
export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);