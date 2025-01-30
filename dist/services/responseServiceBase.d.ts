import { Response } from "express";
declare class ResponseServiceBase {
    response200(res: Response, data: any): Response<any, Record<string, any>>;
    response201(res: Response, message: string): Response<any, Record<string, any>>;
    badRequest(res: Response, message?: string): Response<any, Record<string, any>>;
    unauthorizedException(res: Response, message?: string): Response<any, Record<string, any>>;
    forbidden(res: Response, message?: string): Response<any, Record<string, any>>;
    notFoundException(res: Response, message?: string): Response<any, Record<string, any>>;
    response409(res: Response, message: string): Response<any, Record<string, any>>;
    internalServerErrorException(res: Response, message?: string): Response<any, Record<string, any>>;
    responseError(res: any, status: any, message: any): any;
}
declare const _default: ResponseServiceBase;
export default _default;
