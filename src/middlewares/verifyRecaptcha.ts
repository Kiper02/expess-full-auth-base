import { NextFunction, Request, Response } from "express";
import config from "../utils/config.js";
import { isDev } from "../utils/is-dev.util.js";
import responseServiceBase from "../services/responseServiceBase.js";
import axios from "axios";

export const verifyRecaptcha = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        if(isDev()) return next();
        if(!req.headers['recaptcha']) {
            return responseServiceBase.badRequest(res, 'Не указан токен каптчи')
        }
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: config.getOrThrow('GOOGLE_RECAPTCHA_SECRET_KEY'),
                response: req.headers['recaptcha'],
            },
        });
        const { success } = response.data;
        if (!success) {
            return responseServiceBase.badRequest(res, 'reCAPTCHA verification failed.');
        }
        return next(); 
    } catch (error) {
        return responseServiceBase.internalServerErrorException(res);
    }
};
