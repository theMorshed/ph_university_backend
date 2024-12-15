/**
 * Custom error class for handling application-specific errors.
 * Extends the built-in Error class to include status code and optional stack trace.
 */
class AppError extends Error {
    /** 
     * The HTTP status code associated with the error (e.g., 404 for Not Found).
     */
    public statusCode: number;

    /**
     * Creates an instance of AppError.
     * 
     * @param {number} statusCode - The HTTP status code (e.g., 404, 500).
     * @param {string} message - The error message describing the error.
     * @param {string} [stack=''] - Optional stack trace for debugging.
     */
    constructor(statusCode: number, message: string, stack = '') {
        // Call the parent class (Error) constructor with the message.
        super(message);

        // Set the status code for the error.
        this.statusCode = statusCode;

        // If a stack trace is provided, use it; otherwise, capture the stack trace.
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Exporting the AppError class for use in other parts of the application.
export default AppError;