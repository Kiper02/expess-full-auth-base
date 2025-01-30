import { NextFunction, Request, Response } from "express";
declare class UserController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
declare const _default: UserController;
export default _default;
