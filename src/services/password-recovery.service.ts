import { TokenType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prisma.js";
import { ResetPasswordDto } from "../dto/reset-password.dto.js";
import userService from "./user.service.js";
import { ApiError } from "../exceptions/apiError.js";
import nodemailerService from "../libs/email/nodemailer.service.js";
import { NewPasswordDto } from "../dto/new-password.dto.js";
import { hash } from "argon2";

class PasswordRecoveryService {
  public async resetPassword(dto: ResetPasswordDto) {
    const existingUser = await userService.getByEmail(dto.email);

    if (!existingUser) {
      throw ApiError.notFoundException(
        "Пользователь не найден. Пожалуйста, проверьте введнный адрес электронной почты и попробуйте снова"
      );
    }

    const passwordResetToken = await this.generatePasswordResetToken(
      existingUser.email
    );

    await nodemailerService.sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
    return true;
  }

  public async newPassword(dto: NewPasswordDto, token: string) {
    const existingToken = await prisma.token.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
      },
    });

    if (!existingToken) {
      throw ApiError.notFoundException(
        "Токен не найден. Пожалуйста, проверьте правильность введенного токена или запросите новый"
      );
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw ApiError.badRequest(
        "Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения сброса пароля"
      );
    }

    const existingUser = await userService.getByEmail(existingToken.email);
    if (!existingUser) {
      throw ApiError.notFoundException(
        "Пользователь с указанным адресом электронной почты не найден. Пожайлуйста, убедитесь, что вы ввели правильный email"
      );
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: await hash(dto.password)
        }
    })

    await prisma.token.delete({
        where: {
            id: existingToken.id,
            type: TokenType.PASSWORD_RESET
        }
    })

    return true;
  }

  private async generatePasswordResetToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await prisma.token.findFirst({
      where: {
        email,
        type: TokenType.PASSWORD_RESET,
      },
    });

    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.PASSWORD_RESET,
        },
      });
    }

    const passwordResetToken = await prisma.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.PASSWORD_RESET,
      },
    });
    return passwordResetToken;
  }
}

export default new PasswordRecoveryService();
