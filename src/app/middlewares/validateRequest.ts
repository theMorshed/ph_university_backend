/**
 * Importing necessary types and utilities:
 * - `Request`, `Response`, `NextFunction` from Express: Used to define the middleware function signature.
 * - `AnyZodObject` from Zod: Represents the Zod schema used for request validation.
 * - `catchAsync`: Utility to handle asynchronous errors in Express middleware.
 */

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";


/**
 * Middleware to validate incoming requests against a Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request against.
 * @returns {Function} Middleware function that validates `req.body` and `req.cookies`.
 *
 * @description
 * This middleware uses the provided Zod schema to validate the incoming request.
 * If validation fails, an error will be thrown and passed to the error handler.
 * It uses `catchAsync` to ensure errors are handled properly in an async function.
 *
 * @example
 * // Example usage in a route:
 * import validateRequest from "./validateRequest";
 * import { someSchema } from "./schemas";
 *
 * router.post('/example', validateRequest(someSchema), (req, res) => {
 *   res.send("Request is valid!");
 * });
 */
const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
};

export default validateRequest;
