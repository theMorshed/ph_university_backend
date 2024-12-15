/**
 * Importing the Zod library for schema validation:
 * - `z`: A powerful schema validation library for ensuring API request integrity.
 */
import { z } from "zod";

/**
 * Validation schema for creating a new academic faculty.
 * - Requires `name` to be present and a valid string.
 * - Provides clear error messages for missing or invalid fields.
 */
const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Academic Faculty name is required",
            invalid_type_error: "Academic Faculty name must be a string",
        }),
    }),
});

/**
 * Validation schema for updating an academic faculty.
 * - Allows partial updates by making the `name` field optional.
 * - Ensures the `name` field, if provided, is a valid string.
 */
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Academic Faculty name is required",
            invalid_type_error: "Academic Faculty name must be a string",
        }).optional(),
    }),
});

/**
 * Exporting validation schemas for academic faculty:
 * - `createAcademicFacultyValidationSchema`: Validates create requests.
 * - `updateAcademicFacultyValidationSchema`: Validates update requests.
 */
export const academicFacultyValidations = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
};

