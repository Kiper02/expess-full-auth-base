var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userService from "../services/user.service.js";
import responseServiceBase from "../services/responseServiceBase.js";
export const verifyRolers = (allowRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userService.getById(req.session.userId);
            if (!user) {
                return responseServiceBase.forbidden(res, 'Недостаточно прав. У вас нет прав для доступа к этому ресурсу');
            }
            if (user.role !== allowRole) {
                return responseServiceBase.forbidden(res, 'Недостаточно прав. У вас нет прав для доступа к этому ресурсу');
            }
            next();
        }
        catch (error) {
            return responseServiceBase.internalServerErrorException(res);
        }
    });
};
//# sourceMappingURL=verifyRolers.js.map