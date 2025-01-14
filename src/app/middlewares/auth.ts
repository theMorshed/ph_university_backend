/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Importing necessary modules and utilities:
 * - `Request`, `Response`, `NextFunction` from Express: Used to define middleware function signature.
 * - `catchAsync`: Utility to handle async errors in middleware.
 * - `AppError`: Custom error class for handling application-specific errors.
 * - `StatusCodes` from `http-status-codes`: Predefined HTTP status codes for consistency.
 * - `jwt` and `JwtPayload`: JSON Web Token library for verifying and decoding tokens.
 * - `config`: Configuration object for environment variables.
 * - `TUserRole`: Type representing user roles.
 * - `User`: User model for database operations.
 */

import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

/**
 * Middleware to authenticate and authorize users based on JWT and required roles.
 *
 * @param {...TUserRole[]} requiredRoles - List of roles allowed to access the route.
 * @returns {Function} Express middleware to validate user authentication and role-based access control.
 *
 * @description
 * - Validates the presence of a valid JWT token in the `Authorization` header.
 * - Verifies the token and decodes the payload to extract user information.
 * - Checks if the user exists, is active, and has not been deleted or blocked.
 * - Ensures the JWT was issued before any password change (if applicable).
 * - Validates that the user's role matches the required roles for accessing the route.
 *
 * @throws {AppError} Throws an error for unauthorized access, invalid tokens, or insufficient permissions.
 *
 * @example
 * // Example usage in a route:
 * import auth from "../middlewares/auth";
 *
 * router.get('/admin-data', auth('admin'), (req, res) => {
 *   res.send("This route is only accessible by admins.");
 * });
 */
const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Extract token from Authorization header
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not an authorized user");
        }

        // Verify and decode the JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        } catch(err) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized user');
        }

        const { role, userId, iat } = decoded;

        // Check if the user exists in the database
        const user = await User.isUserExistsByCustomId(userId);

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
        }

        // Check if the user is deleted
        const isDeleted = user?.isDeleted;
        if (isDeleted) {
            throw new AppError(StatusCodes.FORBIDDEN, "This user is deleted!");
        }

        // Check if the user is blocked
        const userStatus = user?.status;
        if (userStatus === "blocked") {
            throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!");
        }

        // Ensure JWT was issued before the password was changed
        if (
            user.passwordChangedAt &&
            User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
        ) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
        }

        // Verify if the user has the required role
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "You are not allowed to perform this task."
            );
        }

        // Attach decoded user information to the request object
        req.user = decoded as JwtPayload;

        // Proceed to the next middleware
        next();
    });
};

export default auth;