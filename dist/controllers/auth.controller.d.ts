import { NextFunction, Request, Response } from "express";
declare class AuthController {
    register: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    callback: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    connect: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    newVerification: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    newPassword: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
declare const _default: AuthController;
export default _default;
