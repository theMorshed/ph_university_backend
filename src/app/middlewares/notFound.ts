/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import statusCodes from 'http-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction): any => {
    return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: 'API not Found',
        error: ''
    })
}

export default notFound;