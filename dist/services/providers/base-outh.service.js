var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiError } from "./../../exceptions/apiError.js";
export class BaseOathService {
    constructor(options) {
        this.options = options;
        this.optionsData = this.options;
    }
    extractUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, data), { provider: this.optionsData.name });
        });
    }
    getAuthUrl() {
        var _a;
        const query = new URLSearchParams({
            response_type: 'code',
            client_id: this.optionsData.client_id,
            redirect_uri: this.getRedirectUrl(),
            scope: ((_a = this.optionsData.scopes) !== null && _a !== void 0 ? _a : []).join(' '),
            access_type: 'offline',
            prompt: 'select_account',
        });
        return `${this.optionsData.authorize_url}?${query}`;
    }
    findUserByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const client_id = this.optionsData.client_id;
            const client_secret = this.optionsData.client_secret;
            const tokenQuery = new URLSearchParams({
                client_id,
                client_secret,
                code,
                redirect_uri: this.getRedirectUrl(),
                grant_type: 'authorization_code'
            });
            const tokenRequest = yield fetch(this.optionsData.access_url, {
                method: 'POST',
                body: tokenQuery,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json '
                }
            });
            if (!tokenRequest.ok) {
                throw ApiError.badRequest(`Не удалось получить пользователя с ${this.optionsData.profile_url}. Пожалуйста проверьте правильность токен доступа`);
            }
            const tokens = yield tokenRequest.json();
            if (!tokens.access_token) {
                throw ApiError.badRequest(`Нет токенов с ${this.optionsData.access_url}`);
            }
            const userRequest = yield fetch(this.optionsData.profile_url, {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`
                }
            });
            if (!userRequest.ok) {
                throw ApiError.unauthorizedException(`Не удалось получить пользователя с ${this.optionsData.profile_url}. Проверьте правильность токена доступа`);
            }
            const user = yield userRequest.json();
            const userData = yield this.extractUserInfo(user);
            return Object.assign(Object.assign({}, userData), { access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_at: tokens.expires_at || tokens.expires_in, provider: this.optionsData.name });
        });
    }
    getRedirectUrl() {
        return `${this.BASE_URL}/api/auth/oauth/callback/${this.optionsData.name}`;
    }
    set baseUrl(value) {
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
//# sourceMappingURL=base-outh.service.js.map