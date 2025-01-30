import { NextFunction, Request, Response } from "express";
export declare const verifyRolers: (allowRole: string) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
