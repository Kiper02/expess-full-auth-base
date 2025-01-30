import { TypeUserInfo } from "../../types/providers/user-info.types.js";
import { TypeBaseProvideroptionsData } from "@/src/types/providers/base-provider.options.types.js";
export declare class BaseOathService {
    private readonly options;
    private BASE_URL;
    optionsData: TypeBaseProvideroptionsData;
    constructor(options: TypeBaseProvideroptionsData);
    protected extractUserInfo(data: any): Promise<TypeUserInfo>;
    getAuthUrl(): string;
    findUserByCode(code: string): Promise<TypeUserInfo>;
    getRedirectUrl(): string;
    set baseUrl(value: string);
    get name(): string;
    get access_url(): string;
    get profile_url(): string;
    get scopes(): string[];
}
