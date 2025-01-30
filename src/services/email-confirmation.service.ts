import { v4 as uuidv4 } from 'uuid'
import prisma from '../config/prisma.js';
import { TokenType, User } from '@prisma/client';
import { ConfirmationDto } from '../dto/confirmation.dto.js';
import { ApiError } from '../exceptions/apiError.js';
import userService from './user.service.js';
import authService from './auth.service.js';
import { Request } from 'express';
import nodemailerService from '../libs/email/nodemailer.service.js';


class EmailConfirmationService {

    public async newVerification(req: Request, dto: ConfirmationDto) {
        const existingToken = await prisma.token.findUnique({
            where: {
                token: dto.token,
                type: TokenType.VERIFICATION
            }
        })  

        if(!existingToken) {
            throw ApiError.notFoundException('Токен подтверждения не найден. Пожалуйста убедитесь, что у вас правильный токен')
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if(hasExpired) {
            throw ApiError.badRequest('Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения')
        }

        const existingUser = await userService.getByEmail(existingToken.email);
        if(!existingUser) {
            throw ApiError.notFoundException('Пользователь с указанным адресом электронной почты не найден. Пожайлуйста, убедитесь, что вы ввели правильный email')
        }

        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                isVerified: true
            }
        })

        await prisma.token.delete({
            where: {
                id: existingToken.id,
                type: TokenType.VERIFICATION
            }
        })

        return await authService.saveSession(req, existingUser)
    }
    
    public async sendVerificationToken(email: string) {
        const verificationToken = await this.generateVerificationToken(email);
        await nodemailerService.sendConfirmationEmail(verificationToken.email, verificationToken.token)
        return true;
    }

    private async generateVerificationToken(email: string) {
        const token = uuidv4();
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

        const existingToken = await prisma.token.findFirst({
            where: {
                email,
                type: TokenType.VERIFICATION
            }
        })

        if(existingToken) {
            await prisma.token.delete({
                where: {
                    id: existingToken.id,
                    type: TokenType.VERIFICATION
                }
            })
        }

        const verificationToken = await prisma.token.create({
            data: {
                email,
                token,
                expiresIn,
                type: TokenType.VERIFICATION
            }
        })
        return verificationToken;
    }
}

export default new EmailConfirmationService();