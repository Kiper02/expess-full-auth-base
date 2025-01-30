import { NextFunction, Request, Response } from "express";
import responseServiceBase from "../services/responseServiceBase.js";
import userService from "../services/user.service.js";

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if(!req.session.userId) {
        return responseServiceBase.unauthorizedException(res, 'Пользователь не авторизован. Пожалуйста войдите в систему, что бы получить доступ')
    }

    const user = await userService.getById(req.session.userId)
    req.user = user;
    next()
}