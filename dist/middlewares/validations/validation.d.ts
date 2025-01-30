import { NextFunction, Request, Response } from "express";
declare function validation(req: Request, res: Response, next: NextFunction, schema: any): Promise<Response<any, Record<string, any>>>;
export default validation;
