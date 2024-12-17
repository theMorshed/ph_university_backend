/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Importing necessary modules:
 * - `NextFunction`, `Request`, `Response` from Express: Types for defining middleware functions in Express.
 * - `statusCodes` from `http-status-codes`: Provides HTTP status code constants for consistent response formatting.
 */

import { NextFunction, Request, Response } from "express";
import statusCodes from "http-status-codes";


/**
 * Middleware to handle requests to undefined API routes.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The outgoing HTTP response object.
 * @param {NextFunction} next - The next middleware function in the request-response cycle.
 * @returns {Response} Returns a JSON response with a 404 status code and an error message.
 */
const notFound = (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "API not Found",
        error: "",
    });
};

export default notFound;
