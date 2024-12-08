/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';

    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } 
    else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }   
        ]
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }   
        ]
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    })
}

export default globalErrorHandler;