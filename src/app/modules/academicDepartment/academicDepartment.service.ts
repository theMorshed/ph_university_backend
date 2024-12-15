// Importing the type and model for academic departments.
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

/**
 * Creates a new academic department in the database.
 * @param payload - The data for the new academic department.
 * @returns The created academic department document.
 */
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    // Creates a new document in the AcademicDepartment collection.
    const result = await AcademicDepartment.create(payload);
    return result;
};

/**
 * Retrieves all academic departments from the database.
 * @returns An array of academic department documents, populated with academic faculty details.
 */
const getAllAcademicDepartments = async () => {
    // Finds all documents and populates the `academicFaculty` reference field.
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
};

/**
 * Retrieves a single academic department by its ID.
 * @param departmentId - The unique identifier of the academic department.
 * @returns The academic department document with populated academic faculty details, or null if not found.
 */
const getSingleAcademicDepartment = async (departmentId: string) => {
    // Finds a document by ID and populates the `academicFaculty` reference field.
    const result = await AcademicDepartment.findById(departmentId).populate('academicFaculty');
    return result;
};

/**
 * Updates an academic department by its ID.
 * @param id - The unique identifier of the academic department.
 * @param payload - The updated data for the academic department.
 * @returns The updated academic department document, or null if not found.
 */
const updateAcademicDepartment = async (id: string, payload: Partial<TAcademicDepartment>) => {
    // Updates the document matching the ID and returns the updated document.
    const result = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true } // Ensures the returned document is the updated one.
    );
    return result;
};

// Exporting the service functions as an object for easy import and usage in other parts of the application.
export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
