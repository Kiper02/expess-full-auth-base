var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "../models/userModel.js";
import authService from "../services/auth.service.js";
import { LoginModel } from "../models/loginModel.js";
import responseServiceBase from "../services/responseServiceBase.js";
import { catchAsync } from "../utils/catchAsync.js";
import { providerService } from "../services/provider.service.js";
import config from "../utils/config.js";
import emailConfirmationService from "../services/email-confirmation.service.js";
import { ResetPasswordDto } from "../dto/reset-password.dto.js";
import passwordRecoveryService from "../services/password-recovery.service.js";
import { NewPasswordDto } from "../dto/new-password.dto.js";
class AuthController {
    constructor() {
        this.register = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = new UserModel(req.body);
            const newUser = yield authService.register(req, user);
            return res.status(200).json(newUser);
        }));
        this.login = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = new LoginModel(req.body);
            const result = yield authService.login(req, user);
            return responseServiceBase.response200(res, result);
        }));
        this.callback = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { provider } = req.params;
            const code = req.query.code;
            if (typeof code != 'string')
                return responseServiceBase.badRequest(res, 'Не был предоставлен код авторизации');
            yield authService.extractProfileFromCode(req, provider, code);
            return res.redirect(`${config.getOrThrow('ALLOWED_ORIGIN')}/dashboard/settings`);
        }));
        this.connect = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { provider } = req.params;
            const providerInstance = (yield providerService).findByService(provider);
            return responseServiceBase.response200(res, { url: providerInstance.getAuthUrl() });
        }));
        this.logout = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield authService.logout(req, res);
            return responseServiceBase.response200(res, { message: 'Сессия удалена' });
        }));
        this.newVerification = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield emailConfirmationService.newVerification(req, req.body);
            return responseServiceBase.response200(res, result);
        }));
        this.resetPassword = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dto = new ResetPasswordDto(req.body);
            const result = yield passwordRecoveryService.resetPassword(dto);
            return responseServiceBase.response200(res, result);
        }));
        this.newPassword = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            const dto = new NewPasswordDto(req.body);
            const result = yield passwordRecoveryService.newPassword(dto, token);
            return responseServiceBase.response200(res, result);
        }));
    }
}
export default new AuthController();
//# sourceMappingURL=auth.controller.js.map