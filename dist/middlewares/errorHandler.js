import { CustomError } from "../exceptions/customError.js";
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);
    if (err instanceof CustomError) {
        return res.status(err.httpCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Не предвиденная ошибка' });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map