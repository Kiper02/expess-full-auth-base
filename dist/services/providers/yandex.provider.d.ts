import { TypeProviderOptions } from "@/src/types/providers/provider-options.types.js";
import { BaseOathService } from "./base-outh.service.js";
import { TypeUserInfo } from "@/src/types/providers/user-info.types.js";
export declare class YandexProvider extends BaseOathService {
    constructor(options: TypeProviderOptions);
    extractUserInfo(data: YandexProfile): Promise<TypeUserInfo>;
}
interface YandexProfile extends Record<string, any> {
    first_name?: string;
    last_name?: string;
    display_name?: string;
    emails: string[];
    default_email?: string;
    default_phone?: {
        id: number;
        number: string;
    };
    real_name?: string;
    is_avatar_empty: boolean;
    birthday?: string;
    default_avatar_id: string;
    login: string;
    old_social_login: string;
    sex?: "male" | "female" | null;
    id: string;
    client_id: string;
    psuid: string;
}
export {};
