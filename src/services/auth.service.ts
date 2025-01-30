import { UserModel } from "../models/userModel.js";
import userService from "./user.service.js";
import { Request, Response } from "express";
import { LoginModel } from "../models/loginModel.js";
import { verify } from "argon2";
import { ApiError } from "../exceptions/apiError.js";
import config from "../utils/config.js";
import { AuthMethod, User } from "@prisma/client";
import { providerService } from "./provider.service.js";
import prisma from "../config/prisma.js";
import emailConfirmationService from "./email-confirmation.service.js";
import twoFactorAuthService from "./two-factor-auth.service.js";

class AuthService {
  public async register(req: Request, user: UserModel) {
    const isExist = await userService.getByEmail(user.email);
    if (isExist)
      throw ApiError.badRequest(
        `Пользователь с email = ${user.email} уже существует`
      );
    const newUser = await userService.create(
      user.email,
      user.password,
      user.name,
      "",
      AuthMethod.CREDENTIALS,
      false
    );

    await emailConfirmationService.sendVerificationToken(newUser.email)

    return {
      message: 'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш emai. Сообщение было отправлено на ваш почтовый адрес.'
    }
  }

  public async login(req: Request, user: LoginModel) {
    const userData = await userService.getByEmail(user.email);
    if (!userData || !userData.password) {
      throw ApiError.notFoundException(
        "Пользователь не найден, пожалуйста проверьте введенные данные"
      );
    }

    const isValidPassword = await verify(userData.password, user.password);
    if (!isValidPassword) {
      throw ApiError.unauthorizedException(
        "Неверный пароль. Пожалуйста попробуйте еще раз или восстановите пароль, если забыли его"
      );
    }

    if(!userData.isVerified) {
      await emailConfirmationService.sendVerificationToken(userData.email)
      throw ApiError.unauthorizedException('Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес')
    }

    if(userData.isTwoFactorEnabled) {
      if(!user.code) {
        await twoFactorAuthService.sendTwoFactorToken(user.email);
        
        return {
          message: 'Проверьте вашу почту. Требуется код двухфакторной аутентификации.' 
        }
      }

      await twoFactorAuthService.validateTwoFactorToken(userData.email, user.code)
    }

    return this.saveSession(req, userData);
  }

  public async extractProfileFromCode(req: Request, provider: string, code: string) {
     const providerInstance = (await providerService).findByService(provider);
     const profile = await providerInstance.findUserByCode(code);
     const account = await prisma.account.findFirst({ where: { id: profile.id, provider: profile.provider } })
     
     let user = account?.userId ? await userService.getById(account.userId) : null;
     if(user) {
       return this.saveSession(req, user);
      }
     user = await userService.create(
      profile.email,
      '',
      profile.name,
      profile.picture,
      AuthMethod[profile.provider.toUpperCase()],
      true
     )
     if(!account) {
      await prisma.account.create({
        data: {
          userId:user.id,
          type: 'oauth',
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at
        }
      })
     }
     return this.saveSession(req, user)
  }

  public async logout(req: Request, res: Response):Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if(err) {
          return reject(ApiError.internalServerErrorException('Не удалось завершить сессию. Возможно возникла проблема с сервером или сессия уже была завершена'));
        }
        res.clearCookie(config.getOrThrow('SESSION_NAME'))
        resolve()
      })
    })
  }

  public async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;
      req.session.save((err) => {
        if(err) {
          return reject(ApiError.internalServerErrorException('Не удалось сохранить сессию. Проверьте правильно ли настроены параметры сессии'))
        }
        resolve({ user });
      });
    });
  }
}

export default new AuthService();
