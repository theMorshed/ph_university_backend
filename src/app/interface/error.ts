/**
 * Represents an array of error sources, where each source has a path and a message.
 * @typedef {Object} TErrorSources
 * @property {string | number} path - The field or parameter where the error occurred.
 * @property {string} message - The error message describing the issue.
 */
export type TErrorSources = {
    path: string | number;
    message: string;
}[];

/**
 * Represents a standardized error response structure.
 * @typedef {Object} TGenericErrorResponse
 * @property {number} statusCode - The HTTP status code representing the error.
 * @property {string} message - A descriptive error message.
 * @property {TErrorSources} errorSources - A list of error details, including paths and messages.
 */
export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};
