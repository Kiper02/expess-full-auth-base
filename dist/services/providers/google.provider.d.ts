import { TypeProviderOptions } from "@/src/types/providers/provider-options.types.js";
import { BaseOathService } from "./base-outh.service.js";
import { TypeUserInfo } from "@/src/types/providers/user-info.types.js";
export declare class GoogleProvider extends BaseOathService {
    constructor(options: TypeProviderOptions);
    extractUserInfo(data: GoogleProfile): Promise<TypeUserInfo>;
}
interface GoogleProfile extends Record<string, any> {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
    hd: string;
    access_token: string;
    refresh_token: string;
}
export {};
