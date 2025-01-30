import { UserModel } from "../models/userModel.js";
import { Request, Response } from "express";
import { LoginModel } from "../models/loginModel.js";
import { User } from "@prisma/client";
declare class AuthService {
    register(req: Request, user: UserModel): Promise<{
        message: string;
    }>;
    login(req: Request, user: LoginModel): Promise<unknown>;
    extractProfileFromCode(req: Request, provider: string, code: string): Promise<unknown>;
    logout(req: Request, res: Response): Promise<void>;
    saveSession(req: Request, user: User): Promise<unknown>;
}
declare const _default: AuthService;
export default _default;
