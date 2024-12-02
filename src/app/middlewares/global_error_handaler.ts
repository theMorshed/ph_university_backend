/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
}

export default globalErrorHandler;