import { NextFunction, Request, Response } from "express";
import responseServiceBase from "../services/responseServiceBase.js";
import userService from "../services/user.service.js";
import { providerService } from "../services/provider.service.js";

export const verifyProvider = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { provider } = req.params;
    const providerInstance = (await providerService).findByService(provider);
    if(!providerInstance) return responseServiceBase.badRequest(res, `Провайдер "${provider}" не найден. Пожалуйста проверьте правильность введенных данных`)
    next()
}