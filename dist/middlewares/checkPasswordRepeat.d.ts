import { NextFunction, Request, Response } from "express";
declare const checkPasswordRepeat: (req: Request, res: Response, next: NextFunction) => void;
export default checkPasswordRepeat;
