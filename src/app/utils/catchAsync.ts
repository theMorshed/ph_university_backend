/**
 * Utility to catch asynchronous errors in Express middleware.
 * 
 * - `RequestHandler` is the type for the middleware function.
 * - The `catchAsync` function wraps an async middleware function and ensures that any errors are passed to the next middleware (error handler).
 * 
 * @param fn - The async middleware function to be wrapped.
 * @returns A new middleware function that catches and passes any errors to the next handler.
 */

import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}

export default catchAsync;
