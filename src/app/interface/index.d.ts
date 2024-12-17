/**
 * Extending the Express Request interface to include a custom `user` property.
 * - `user` is expected to hold a JWT payload after authentication.
 */

import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        /**
         * Augments the Request interface with a `user` property.
         * @property {JwtPayload} user - Contains the decoded JWT payload.
         */
        interface Request {
            user: JwtPayload;
        }
    }
}
