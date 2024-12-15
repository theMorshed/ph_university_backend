/*
 * Importing necessary modules:
 * - `mongoose`: Provides functionality for interacting with MongoDB.
 * - `TErrorSources`, `TGenericErrorResponse`: Type definitions for handling error response structure.
 */
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

/*
 * Function to handle CastError when an invalid ID is provided in MongoDB queries.
 * - Takes in a `mongoose.Error.CastError` and returns a structured error response.
 * 
 * @param err - The CastError object thrown by Mongoose when an invalid ID is encountered.
 * @returns A standardized error response with status code and error details.
 */
const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    // Mapping the error details into a structured format
    const errorSources: TErrorSources = [
        {
            path: err?.path,  // Path where the error occurred (e.g., the field name)
            message: err?.message // Error message from the CastError
        }
    ];

    // Defining a 400 status code for Bad Request due to invalid ID
    const statusCode = 400;

    // Returning the structured error response
    return {
        statusCode,
        message: 'Invalid ID',  // Custom error message
        errorSources  // Detailed error information
    };
};

// Exporting the function for use in error handling middleware
export default handleCastError;