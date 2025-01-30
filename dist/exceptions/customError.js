export class CustomError extends Error {
    constructor(message, httpCode) {
        super(message);
        this.httpCode = httpCode;
        this.name = this.constructor.name; // Устанавливаем имя ошибки
    }
}
export class BadRequestError extends CustomError {
    constructor(message) {
        super(message || 'Bad Request', 400);
    }
}
export class NotFoundError extends CustomError {
    constructor(message) {
        super(message || 'Not Found', 404);
    }
}
//# sourceMappingURL=customError.js.map