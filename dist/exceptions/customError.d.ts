export declare class CustomError extends Error {
    httpCode: number;
    constructor(message: string, httpCode: number);
}
export declare class BadRequestError extends CustomError {
    constructor(message?: string);
}
export declare class NotFoundError extends CustomError {
    constructor(message?: string);
}
