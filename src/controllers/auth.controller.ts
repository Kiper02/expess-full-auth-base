import { UserModel } from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service.js";
import authService from "../services/auth.service.js";
import { ApiError } from "../exceptions/apiError.js";
import { LoginModel } from "../models/loginModel.js";
import { verify } from "argon2";
import responseServiceBase from "../services/responseServiceBase.js";
import { catchAsync } from "../utils/catchAsync.js";
import { providerService } from "../services/provider.service.js";
import config from "../utils/config.js";
import emailConfirmationService from "../services/email-confirmation.service.js";
import { ResetPasswordDto } from "../dto/reset-password.dto.js";
import passwordRecoveryService from "../services/password-recovery.service.js";
import { NewPasswordDto } from "../dto/new-password.dto.js";

class AuthController {
  register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

      const user = new UserModel(req.body);
      const newUser = await authService.register(req, user);
      return res.status(200).json(newUser);
  })

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = new LoginModel(req.body);
      const result =await authService.login(req, user);
      return responseServiceBase.response200(res, result);
    }
  );

  callback = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { provider } = req.params;
      const code = req.query.code;
      if(typeof code != 'string') return responseServiceBase.badRequest(res, 'Не был предоставлен код авторизации')
      
      await authService.extractProfileFromCode(req, provider, code); 
      return res.redirect(`${config.getOrThrow('ALLOWED_ORIGIN')}/dashboard/settings`)
    }
  );

  connect = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { provider } = req.params;
      const providerInstance = (await providerService).findByService(provider);
      return responseServiceBase.response200(res, { url: providerInstance.getAuthUrl() })
    }
  );

  logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await authService.logout(req, res);
      return responseServiceBase.response200(res, {message: 'Сессия удалена'})
    }
  );

  newVerification = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await emailConfirmationService.newVerification(req, req.body);
    return responseServiceBase.response200(res, result);
  })

  resetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const dto = new ResetPasswordDto(req.body);
      const result = await passwordRecoveryService.resetPassword(dto)
      return responseServiceBase.response200(res, result)
    }
  );

  newPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.params.token;
      const dto = new NewPasswordDto(req.body);
      const result = await passwordRecoveryService.newPassword(dto, token);
      return responseServiceBase.response200(res, result)
    }
  );
}

export default new AuthController();
