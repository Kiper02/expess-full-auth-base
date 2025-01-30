var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userService from "./user.service.js";
import { verify } from "argon2";
import { ApiError } from "../exceptions/apiError.js";
import config from "../utils/config.js";
import { AuthMethod } from "@prisma/client";
import { providerService } from "./provider.service.js";
import prisma from "../config/prisma.js";
import emailConfirmationService from "./email-confirmation.service.js";
class AuthService {
    register(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield userService.getByEmail(user.email);
            if (isExist)
                throw ApiError.badRequest(`Пользователь с email = ${user.email} уже существует`);
            const newUser = yield userService.create(user.email, user.password, user.name, "", AuthMethod.CREDENTIALS, false);
            yield emailConfirmationService.sendVerificationToken(newUser);
            return {
                message: 'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш emai. Сообщение было отправлено на ваш почтовый адрес.'
            };
        });
    }
    login(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield userService.getByEmail(user.email);
            if (!userData || !userData.password) {
                throw ApiError.notFoundException("Пользователь не найден, пожалуйста проверьте введенные данные");
            }
            const isValidPassword = yield verify(userData.password, user.password);
            if (!isValidPassword) {
                throw ApiError.unauthorizedException("Неверный пароль. Пожалуйста попробуйте еще раз или восстановите пароль, если забыли его");
            }
            if (!userData.isVerified) {
                yield emailConfirmationService.sendVerificationToken(userData);
                throw ApiError.unauthorizedException('Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес');
            }
            return this.saveSession(req, userData);
        });
    }
    extractProfileFromCode(req, provider, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerInstance = (yield providerService).findByService(provider);
            const profile = yield providerInstance.findUserByCode(code);
            const account = yield prisma.account.findFirst({ where: { id: profile.id, provider: profile.provider } });
            let user = (account === null || account === void 0 ? void 0 : account.userId) ? yield userService.getById(account.userId) : null;
            if (user) {
                return this.saveSession(req, user);
            }
            user = yield userService.create(profile.email, '', profile.name, profile.picture, AuthMethod[profile.provider.toUpperCase()], true);
            if (!account) {
                yield prisma.account.create({
                    data: {
                        userId: user.id,
                        type: 'oauth',
                        provider: profile.provider,
                        accessToken: profile.access_token,
                        refreshToken: profile.refresh_token,
                        expiresAt: profile.expires_at
                    }
                });
            }
            return this.saveSession(req, user);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                req.session.destroy(err => {
                    if (err) {
                        return reject(ApiError.internalServerErrorException('Не удалось завершить сессию. Возможно возникла проблема с сервером или сессия уже была завершена'));
                    }
                    res.clearCookie(config.getOrThrow('SESSION_NAME'));
                    resolve();
                });
            });
        });
    }
    saveSession(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                req.session.userId = user.id;
                req.session.save((err) => {
                    if (err) {
                        return reject(ApiError.internalServerErrorException('Не удалось сохранить сессию. Проверьте правильно ли настроены параметры сессии'));
                    }
                    resolve({ user });
                });
            });
        });
    }
}
export default new AuthService();
//# sourceMappingURL=auth.service.js.map