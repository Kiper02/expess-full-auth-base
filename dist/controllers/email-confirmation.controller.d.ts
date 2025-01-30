import { NextFunction, Request, Response } from "express";
declare class AuthController {
    newVerification: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
declare const _default: AuthController;
export default _default;
