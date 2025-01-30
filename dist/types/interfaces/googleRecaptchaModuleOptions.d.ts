import { Request } from "express";
export default interface GoogleRecaptchaModuleOptions {
    secretKey: string;
    response: (req: Request) => string | undefined;
    skipIf: boolean;
}
