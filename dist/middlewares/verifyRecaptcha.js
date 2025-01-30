var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from "../utils/config.js";
import { isDev } from "../utils/is-dev.util.js";
import responseServiceBase from "../services/responseServiceBase.js";
import axios from "axios";
export const verifyRecaptcha = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isDev())
            return next();
        if (!req.headers['recaptcha']) {
            return responseServiceBase.badRequest(res, 'Не указан токен каптчи');
        }
        const response = yield axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
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
    }
    catch (error) {
        return responseServiceBase.internalServerErrorException(res);
    }
});
//# sourceMappingURL=verifyRecaptcha.js.map