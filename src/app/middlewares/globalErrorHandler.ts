/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Global Error Handler Middleware
 * 
 * This middleware handles various types of errors that may occur within the application,
 * including validation errors (Zod and Mongoose), cast errors, duplicate key errors from MongoDB,
 * and custom application-specific errors. It processes the error, maps it to a standardized response,
 * and returns an appropriate HTTP status code with error details.
 * 
 * The middleware ensures that errors are consistently formatted and includes helpful error sources 
 * and messages for debugging and user feedback. The response is adjusted based on the environment 
 * (e.g., stack trace is included in development mode).
 */

/**
 * Importing necessary modules:
 * - `NextFunction`, `Request`, `Response` from Express: Express types for request, response, and next function.
 * - `StatusCodes` from `http-status-codes`: HTTP status code constants for standard response codes.
 * - `ZodError` from `zod`: Zod library for schema validation and error handling.
 * - `config`: Application configuration (e.g., environment variables).
 * - `TErrorSources`: Type definitions for error sources used in responses.
 * - `handleZodError`: Helper function for handling Zod validation errors.
 * - `handleValidationError`: Helper function for handling Mongoose validation errors.
 * - `handleCastError`: Helper function for handling Mongoose cast errors (e.g., invalid ObjectId).
 * - `handleDuplicateError`: Helper function for handling MongoDB duplicate key errors.
 * - `AppError`: Custom error class for handling application-specific errors.
 */

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

/**
 * Global error handler function.
 * 
 * Processes different error types (Zod, Mongoose, duplicate keys, etc.) and 
 * returns a standardized error response.
 * 
 * @param err - The error object thrown in the application
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The Express next middleware function
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // Default to 500 Internal Server Error
    let message = "Something went wrong"; // Default error message

    // Default error source structure
    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];

    // Handle Zod validation errors
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    // Handle Mongoose validation errors
    else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    // Handle Mongoose CastError (e.g., invalid ObjectId)
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    // Handle MongoDB duplicate key errors
    else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Handle custom application errors
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            }   
        ];
    }
    // Handle generic JavaScript errors
    else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            }   
        ];
    }

    // Send structured error response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err, // Raw error object (optional, useful in development)
        stack: config.NODE_ENV === "development" ? err?.stack : null, // Include stack trace in development mode
    });
};

export default globalErrorHandler;