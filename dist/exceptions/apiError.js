export class ApiError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
    }
    static internalServerErrorException(message) {
        return new ApiError(500, message);
    }
    static notFoundException(message) {
        return new ApiError(404, message);
    }
    static unauthorizedException(message) {
        return new ApiError(401, message);
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
}
//# sourceMappingURL=apiError.js.map