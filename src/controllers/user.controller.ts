import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import userService from "../services/user.service.js";
import responseServiceBase from "../services/responseServiceBase.js";
import { UpdateUserDto } from "../dto/update-user.dto.js";

class UserController {
  create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
  getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.getById(req.user.id);
      return responseServiceBase.response200(res, result);
    }
  );
  findProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.getById(req.user.id);
      return responseServiceBase.response200(res, result);
    }
  );
  delete = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      
    }
  );
  updateProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const dto = new UpdateUserDto(req.body);
      const result = await userService.update(req.user.id, dto);
      return responseServiceBase.response200(res, result);
    }
  );
}

export default new UserController();
