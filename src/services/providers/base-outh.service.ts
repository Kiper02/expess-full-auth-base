import { ApiError } from "./../../exceptions/apiError.js";
import { TypeUserInfo } from "../../types/providers/user-info.types.js";
import { TypeBaseProvideroptionsData } from "@/src/types/providers/base-provider.options.types.js";

export class BaseOathService {
    private BASE_URL: string;
    optionsData: TypeBaseProvideroptionsData;

    public constructor(private readonly options: TypeBaseProvideroptionsData) {
        this.optionsData = this.options;
    }

    protected async extractUserInfo(data: any): Promise<TypeUserInfo> {
        return {
            ...data,
            provider: this.optionsData.name
        }
    }

    public getAuthUrl() {
        const query = new URLSearchParams({
            response_type: 'code',
            client_id: this.optionsData.client_id,
            redirect_uri: this.getRedirectUrl(),
            scope: (this.optionsData.scopes ?? []).join(' '),
            access_type: 'offline',
            prompt: 'select_account',  
        })
        
        return `${this.optionsData.authorize_url}?${query}`
    }

    public async findUserByCode(code: string): Promise<TypeUserInfo> {
        const client_id = this.optionsData.client_id;
        const client_secret = this.optionsData.client_secret;

        const tokenQuery = new URLSearchParams({
            client_id,
            client_secret,
            code,
            redirect_uri: this.getRedirectUrl(),
            grant_type: 'authorization_code'
        })

        const tokenRequest = await fetch(this.optionsData.access_url, {
            method: 'POST',
            body: tokenQuery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json '
            }
        })
        if(!tokenRequest.ok) {
            throw ApiError.badRequest(`Не удалось получить пользователя с ${this.optionsData.profile_url}. Пожалуйста проверьте правильность токен доступа`)
        }

        const tokens = await tokenRequest.json()

        if(!tokens.access_token) {
            throw ApiError.badRequest(`Нет токенов с ${this.optionsData.access_url}`)
        }

        const userRequest = await fetch(this.optionsData.profile_url, {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        })
        if(!userRequest.ok) {
            throw ApiError.unauthorizedException(`Не удалось получить пользователя с ${this.optionsData.profile_url}. Проверьте правильность токена доступа`)
        }

        const user = await userRequest.json();
        const userData = await this.extractUserInfo(user);

        return {
            ...userData,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: tokens.expires_at || tokens.expires_in,
            provider: this.optionsData.name,
        }
    }

    public getRedirectUrl() {
        return `${this.BASE_URL}/api/auth/oauth/callback/${this.optionsData.name}`
    }

    set baseUrl(value: string) {
        this.BASE_URL = value;
    }

    get name() {
        return this.optionsData.name;
    }

    get access_url() {
        return this.optionsData.access_url;
    }

    get profile_url() {
        return this.optionsData.profile_url;
    }

    get scopes() {
        return this.optionsData.scopes;
    }
}