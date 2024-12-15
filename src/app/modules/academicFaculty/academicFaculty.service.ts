/**
 * Importing dependencies for academic faculty services:
 * - `TAcademicFaculty`: TypeScript type for academic faculty data.
 * - `AcademicFaculty`: Mongoose model for interacting with the academic faculty collection.
 */
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

/**
 * Creates a new academic faculty in the database.
 * 
 * @param payload - The data for the new academic faculty, adhering to `TAcademicFaculty`.
 * @returns The created academic faculty document.
 */
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

/**
 * Retrieves all academic faculties from the database.
 * 
 * @returns An array of all academic faculty documents.
 */
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find({});
    return result;
};

/**
 * Retrieves a single academic faculty by its ID.
 * 
 * @param facultyId - The unique ID of the academic faculty to retrieve.
 * @returns The academic faculty document, or `null` if not found.
 */
const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
    const result = await AcademicFaculty.findById(facultyId);
    return result;
};

/**
 * Updates an existing academic faculty in the database.
 * 
 * @param id - The unique ID of the academic faculty to update.
 * @param payload - The partial data to update, adhering to `Partial<TAcademicFaculty>`.
 * @returns The updated academic faculty document, or `null` if not found.
 */
const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

/**
 * Exporting the academic faculty services for use in controllers or routes:
 * - `createAcademicFacultyIntoDB`: Handles faculty creation.
 * - `getAllAcademicFacultiesFromDB`: Fetches all faculties.
 * - `getSingleAcademicFacultyFromDB`: Fetches a single faculty by ID.
 * - `updateAcademicFacultyIntoDB`: Updates faculty data by ID.
 */
export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
};