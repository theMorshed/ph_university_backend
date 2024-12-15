/*
 * Importing `Types` from Mongoose to use `ObjectId` for referencing documents in MongoDB.
 */
import { Types } from "mongoose";

/*
 * Defining a TypeScript type `TAcademicDepartment` to enforce the structure of an academic department object.
 * 
 * - `name`: The name of the academic department (string).
 * - `academicFaculty`: A reference to the `ObjectId` of an academic faculty document, establishing a relationship between the department and faculty.
 */
export type TAcademicDepartment = {
    name: string; // The name of the academic department.
    academicFaculty: Types.ObjectId; // Reference to an academic faculty document in MongoDB.
};
