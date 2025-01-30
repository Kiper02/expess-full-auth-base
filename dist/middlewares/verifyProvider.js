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
import { providerService } from "../services/provider.service.js";
export const verifyProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { provider } = req.params;
    const providerInstance = (yield providerService).findByService(provider);
    if (!providerInstance)
        return responseServiceBase.badRequest(res, `Провайдер "${provider}" не найден. Пожалуйста проверьте правильность введенных данных`);
    next();
});
//# sourceMappingURL=verifyProvider.js.map