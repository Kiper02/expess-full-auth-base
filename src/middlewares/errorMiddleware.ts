import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError.js";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): any => {
    if(err instanceof ApiError) {
        return res.status(err.httpCode).json({message: err.message})
    }
    console.log(err);
    return res.status(500).json({message: 'Не предвиденная ошибка'})
}