/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodArray, ZodError } from "zod";
import config from "../config";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong';

    type TErrorSources = {
        path: string | number;
        message: string;
    }[];
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    const handleZodError = (err: ZodError) => {
        const errorSources: TErrorSources = err.issues.map(issue => {
            return {
                path: issue?.path[issue.path.length -1],
                message: issue?.message
            }
        })
        statusCode = 400;

        return {
            statusCode,
            message: 'Validation error',
            errorSources
        }
    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    })
}

export default globalErrorHandler;