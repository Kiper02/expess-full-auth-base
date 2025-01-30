var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import responseServiceBase from "../services/responseServiceBase.js";
import userService from "../services/user.service.js";
export const verifyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return responseServiceBase.unauthorizedException(res, 'Пользователь не авторизован. Пожалуйста войдите в систему, что бы получить доступ');
    }
    const user = yield userService.getById(req.session.userId);
    req.user = user;
    next();
});
//# sourceMappingURL=verifyAuth.js.map