export declare class ApiError extends Error {
    httpCode: number;
    message: string;
    constructor(httpCode: number, message: string);
    static internalServerErrorException(message: string): ApiError;
    static notFoundException(message: string): ApiError;
    static unauthorizedException(message: string): ApiError;
    static badRequest(message: string): ApiError;
}
