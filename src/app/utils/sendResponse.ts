/**
 * Utility function to send a standardized response from an Express route handler.
 * 
 * This function formats the response with the status code, success status, message, and data,
 * ensuring consistent API responses across the application.
 * 
 * @template T - The type of data to be sent in the response.
 * @param res - The Express response object used to send the response.
 * @param data - The response data, including the status code, success status, message, and data payload.
 */
import { Response } from "express";

type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: TMeta;
    data: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    })
}

export default sendResponse;