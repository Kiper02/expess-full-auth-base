import { ApiError } from "../exceptions/apiError.js";
export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.httpCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: 'Не предвиденная ошибка' });
};
//# sourceMappingURL=errorMiddleware.js.map