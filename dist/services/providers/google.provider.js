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
export class GoogleProvider extends BaseOathService {
    constructor(options) {
        super({
            name: "google",
            authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
            access_url: "https://oauth2.googleapis.com/token",
            profile_url: "https://www.googleapis.com/oauth2/v3/userinfo",
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
                email: data.email,
                name: data.name,
                picture: data.picture
            });
        });
    }
}
//# sourceMappingURL=google.provider.js.map