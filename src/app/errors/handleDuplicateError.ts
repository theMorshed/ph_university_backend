/*
 * Disabling TypeScript ESLint rule for explicit 'any' usage.
 * - This is to handle dynamic error object types that may not strictly follow the type definitions.
 */
 /* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from "../interface/error";

/*
 * Function to handle duplicate key errors (e.g., when trying to insert a document with a unique field value that already exists).
 * - This function processes the error message to extract relevant details and constructs a standardized error response.
 * 
 * @param err - The error object, typically thrown when attempting to insert a duplicate value into a unique field.
 * @returns A structured error response with status code and detailed error information.
 */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // Extracting the value within double quotes (e.g., the field name or value causing the duplication)
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group (the field or value causing the duplicate)
    const extractedMessage = match && match[1];

    // Structuring the error response with details about the duplicate error
    const errorSources: TErrorSources = [
        {
            path: err?.path,  // Path of the field that caused the error
            message: `${extractedMessage} already exists` // Error message indicating duplication
        }
    ];

    // Defining a 400 status code for Bad Request due to duplication
    const statusCode = 400;

    // Returning the structured error response
    return {
        statusCode,
        message: 'Invalid ID',  // Custom error message
        errorSources  // Detailed error information
    };
};

// Exporting the function for use in error handling middleware
export default handleDuplicateError;