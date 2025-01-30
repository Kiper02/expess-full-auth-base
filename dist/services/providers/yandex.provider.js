var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseOathService } from "./base-outh.service.js";
export class YandexProvider extends BaseOathService {
    constructor(options) {
        super({
            name: "yandex",
            authorize_url: "https://oauth.yandex.ru/authorize",
            access_url: "https://oauth.yandex.ru/token",
            profile_url: "https://login.yandex.ru/info?format=json",
            scopes: options.scopes,
            client_id: options.client_id,
            client_secret: options.client_secret,
        });
    }
    extractUserInfo(data) {
        const _super = Object.create(null, {
            extractUserInfo: { get: () => super.extractUserInfo }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.extractUserInfo.call(this, {
                email: data.emails[0],
                name: data.display_name,
                pictire: data.default_avatar_id ? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200` : undefined
            });
        });
    }
}
//# sourceMappingURL=yandex.provider.js.map