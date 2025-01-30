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
import { catchAsync } from "../utils/catchAsync.js";
import emailConfirmationService from "../services/email-confirmation.service.js";
class AuthController {
    constructor() {
        this.newVerification = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = emailConfirmationService.newVerification(req, req.body);
            return responseServiceBase.response200(res, result);
        }));
    }
}
export default new AuthController();
//# sourceMappingURL=email-confirmation.controller.js.map