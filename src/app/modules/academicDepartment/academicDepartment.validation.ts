/*
 * Importing `z` from the Zod library for schema validation.
 */
import { z } from "zod";

/*
 * Helper function to generate consistent validation rules for string fields.
 * - Provides custom error messages for required and invalid type errors.
 */
const stringField = (fieldName: string) =>
    z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
    });

/*
 * Validation schema for creating a new academic department.
 * - Requires `name` and `academicFaculty` to be present and valid.
 */
const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: stringField('Department name'),
        academicFaculty: stringField('Academic Faculty'),
    }),
});

/*
 * Validation schema for updating an academic department.
 * - Allows partial updates, making fields optional.
 */
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: stringField('Department name').optional(),
        academicFaculty: stringField('Academic Faculty').optional(),
    }),
});

/*
 * Exporting the validation schemas for use in routes or controllers.
 */
export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
