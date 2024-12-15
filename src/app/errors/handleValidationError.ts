/*
 * Importing necessary modules:
 * - `mongoose`: For interacting with MongoDB and handling mongoose-specific errors.
 * - `TErrorSources`, `TGenericErrorResponse`: Types used to structure the error response for validation errors.
 */
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

/**
 * Handles mongoose validation errors and formats them into a standardized error response.
 * This is typically used when a validation fails for a field (e.g., required fields, invalid data types).
 *
 * @param err - The error object thrown by mongoose when a validation error occurs.
 * @returns A structured error response with a status code, message, and details of the validation errors.
 */
const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    // Mapping through all validation errors and extracting relevant details
    const errorSources: TErrorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,  // The path of the field that caused the error
            message: val?.message,  // The validation error message
        }
    });

    // Defining a 400 status code to indicate a bad request due to validation failure
    const statusCode = 400;

    // Returning a structured error response with validation error details
    return {
        statusCode,
        message: 'Validation error',  // Custom message for validation errors
        errorSources  // Detailed information about each validation error
    };
};

// Exporting the function for use in error handling middleware
export default handleValidationError;