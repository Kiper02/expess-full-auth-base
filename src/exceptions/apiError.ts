export class ApiError extends Error {
    httpCode: number;
    message: string;
    
    constructor(httpCode: number, message: string) {
        super(message)
        this.httpCode = httpCode;
        this.message = message;
    }

    static internalServerErrorException(message: string) {
        return new ApiError(500, message);
    }

    static notFoundException(message: string) {
        return new ApiError(404, message);
    }

    static unauthorizedException(message: string) {
        return new ApiError(401, message);
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }
} 