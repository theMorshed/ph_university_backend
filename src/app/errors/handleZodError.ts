/*
 * Importing necessary modules:
 * - `ZodError`: Error class from the Zod validation library.
 * - `TErrorSources`, `TGenericErrorResponse`: Types used to structure the error response for validation errors.
 */
import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

/**
 * Handles Zod validation errors and formats them into a standardized error response.
 * Zod is a schema validation library that provides strong typing and structured validation.
 * This function is invoked when validation fails on a request's data, typically on API endpoints.
 *
 * @param err - The error object thrown by Zod during validation failure.
 * @returns A structured error response with a status code, message, and details of the validation errors.
 */
const handleZodError = (err: ZodError): TGenericErrorResponse => {
    // Mapping through all issues from the Zod error and extracting relevant details
    const errorSources: TErrorSources = err.issues.map(issue => {
        return {
            path: issue?.path[issue.path.length - 1],  // The field path where the error occurred
            message: issue?.message  // The error message provided by Zod
        };
    });

    // Defining a 400 status code to indicate a bad request due to validation failure
    const statusCode = 400;

    // Returning a structured error response with Zod validation error details
    return {
        statusCode,
        message: 'Zod Validation error',  // Custom message for Zod validation errors
        errorSources  // Detailed information about each validation error
    };
};

// Exporting the function for use in error handling middleware
export default handleZodError;