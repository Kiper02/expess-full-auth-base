import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service.js";
import responseServiceBase from "../services/responseServiceBase.js";

export const verifyRolers = (allowRole: string) => {
    return async (req: Request, res: Response, next: NextFunction):Promise<any> => {
        try {
            const user = await userService.getById(req.session.userId);
            if (!user) {
                return responseServiceBase.forbidden(res, 'Недостаточно прав. У вас нет прав для доступа к этому ресурсу');
            }
            if (user.role !== allowRole) {
                return responseServiceBase.forbidden(res, 'Недостаточно прав. У вас нет прав для доступа к этому ресурсу'); 
            }
            next(); 
        } catch (error) {
            return responseServiceBase.internalServerErrorException(res); 
        }
    };
};
