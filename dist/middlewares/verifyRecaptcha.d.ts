import { NextFunction, Request, Response } from "express";
export declare const verifyRecaptcha: (req: Request, res: Response, next: NextFunction) => Promise<any>;
