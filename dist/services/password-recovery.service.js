var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TokenType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prisma.js";
import userService from "./user.service.js";
import { ApiError } from "../exceptions/apiError.js";
import nodemailerService from "../libs/email/nodemailer.service.js";
import { hash } from "argon2";
class PasswordRecoveryService {
    resetPassword(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userService.getByEmail(dto.email);
            if (!existingUser) {
                throw ApiError.notFoundException("Пользователь не найден. Пожалуйста, проверьте введнный адрес электронной почты и попробуйте снова");
            }
            const passwordResetToken = yield this.generatePasswordResetToken(existingUser.email);
            yield nodemailerService.sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
            return true;
        });
    }
    newPassword(dto, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingToken = yield prisma.token.findFirst({
                where: {
                    token,
                    type: TokenType.PASSWORD_RESET,
                },
            });
            if (!existingToken) {
                throw ApiError.notFoundException("Токен не найден. Пожалуйста, проверьте правильность введенного токена или запросите новый");
            }
            const hasExpired = new Date(existingToken.expiresIn) < new Date();
            if (hasExpired) {
                throw ApiError.badRequest("Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения сброса пароля");
            }
            const existingUser = yield userService.getByEmail(existingToken.email);
            if (!existingUser) {
                throw ApiError.notFoundException("Пользователь с указанным адресом электронной почты не найден. Пожайлуйста, убедитесь, что вы ввели правильный email");
            }
            yield prisma.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    password: yield hash(dto.password)
                }
            });
            yield prisma.token.delete({
                where: {
                    id: existingToken.id,
                    type: TokenType.PASSWORD_RESET
                }
            });
            return true;
        });
    }
    generatePasswordResetToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = uuidv4();
            const expiresIn = new Date(new Date().getTime() + 3600 * 1000);
            const existingToken = yield prisma.token.findFirst({
                where: {
                    email,
                    type: TokenType.PASSWORD_RESET,
                },
            });
            if (existingToken) {
                yield prisma.token.delete({
                    where: {
                        id: existingToken.id,
                        type: TokenType.PASSWORD_RESET,
                    },
                });
            }
            const passwordResetToken = yield prisma.token.create({
                data: {
                    email,
                    token,
                    expiresIn,
                    type: TokenType.PASSWORD_RESET,
                },
            });
            return passwordResetToken;
        });
    }
}
export default new PasswordRecoveryService();
//# sourceMappingURL=password-recovery.service.js.map