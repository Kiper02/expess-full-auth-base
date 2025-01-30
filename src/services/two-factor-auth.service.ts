import { TokenType } from "@prisma/client";
import prisma from "../config/prisma.js";
import { ApiError } from "../exceptions/apiError.js";
import nodemailerService from "../libs/email/nodemailer.service.js";

class TwoFactorAuthService {
    public async validateTwoFactorToken(email: string, code: string) {
        const existingToken = await prisma.token.findFirst({
            where: {
                email,
                type: TokenType.TWO_FACTOR
            }
        })  

        if(!existingToken) {
            throw ApiError.notFoundException(
                'Токен двухфакторной аутентификации не найден. Убедитесь, что вы запрашивали токен для данного адреса электронной почты')
        }

        if(existingToken.token !== code) {
            throw ApiError.badRequest('Неверный код двухфакторно аутентификации. Пожалуйста проверьте введенный код и попробуйте снова')
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if(hasExpired) {
            throw ApiError.badRequest('Срок действия токена двухфакторной аутентификации истек. Пожалуйста, запросите новый токен')
        }

        await prisma.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.TWO_FACTOR
            }
        })

        return true;
    }

        public async sendTwoFactorToken(email: string) {
            const twoFactorToken = await this.generateTwoFactorToken(email);
            await nodemailerService.sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
            return true;
        }


    private async generateTwoFactorToken(email: string) {
        const token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString()
        const expiresIn = new Date(new Date().getTime() + 300000);

        const existingToken = await prisma.token.findFirst({
            where: {
                email,
                type: TokenType.TWO_FACTOR
            }
        })

        if(existingToken) {
            await prisma.token.delete({
                where: {
                    id: existingToken.id,
                    type: TokenType.TWO_FACTOR
                }
            })
        }

        const twoFactorToken = await prisma.token.create({
            data: {
                email,
                token,
                expiresIn,
                type: TokenType.TWO_FACTOR
            }
        })
        return twoFactorToken;
    }
}


export default new TwoFactorAuthService();