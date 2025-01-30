var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma.js';
import { TokenType } from '@prisma/client';
import { ApiError } from '../exceptions/apiError.js';
import userService from './user.service.js';
import authService from './auth.service.js';
import nodemailerService from '../libs/email/nodemailer.service.js';
class EmailConfirmationService {
    newVerification(req, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingToken = yield prisma.token.findUnique({
                where: {
                    token: dto.token,
                    type: TokenType.VERIFICATION
                }
            });
            if (!existingToken) {
                throw ApiError.notFoundException('Токен подтверждения не найден. Пожалуйста убедитесь, что у вас правильный токен');
            }
            const hasExpired = new Date(existingToken.expiresIn) < new Date();
            if (hasExpired) {
                throw ApiError.badRequest('Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения');
            }
            const existingUser = yield userService.getByEmail(existingToken.email);
            if (!existingUser) {
                throw ApiError.notFoundException('Пользователь с указанным адресом электронной почты не найден. Пожайлуйста, убедитесь, что вы ввели правильный email');
            }
            yield prisma.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    isVerified: true
                }
            });
            yield prisma.token.delete({
                where: {
                    id: existingToken.id,
                    type: TokenType.VERIFICATION
                }
            });
            return yield authService.saveSession(req, existingUser);
        });
    }
    sendVerificationToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = yield this.generateVerificationToken(user.email);
            yield nodemailerService.sendConfirmationEmail(verificationToken.email, verificationToken.token);
            return true;
        });
    }
    generateVerificationToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = uuidv4();
            const expiresIn = new Date(new Date().getTime() + 3600 * 1000);
            const existingToken = yield prisma.token.findFirst({
                where: {
                    email,
                    type: TokenType.VERIFICATION
                }
            });
            if (existingToken) {
                yield prisma.token.delete({
                    where: {
                        id: existingToken.id,
                        type: TokenType.VERIFICATION
                    }
                });
            }
            const verificationToken = yield prisma.token.create({
                data: {
                    email,
                    token,
                    expiresIn,
                    type: TokenType.VERIFICATION
                }
            });
            return verificationToken;
        });
    }
}
export default new EmailConfirmationService();
//# sourceMappingURL=email-confirmation.service.js.map