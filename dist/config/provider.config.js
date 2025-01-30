var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleProvider } from "../services/providers/google.provider.js";
import { YandexProvider } from "../services/providers/yandex.provider.js";
import config from "../utils/config.js";
export const getProviderConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        baseUrl: config.getOrThrow('APPLICATION_URL'),
        services: [
            new GoogleProvider({
                client_id: config.getOrThrow('GOOGLE_CLIENT_ID'),
                client_secret: config.getOrThrow('GOOGLE_CLIENT_SECRET'),
                scopes: ['email', 'profile']
            }),
            new YandexProvider({
                client_id: config.getOrThrow('YANDEX_CLIENT_ID'),
                client_secret: config.getOrThrow('YANDEX_CLIENT_SECRET'),
                scopes: ['login:email', 'login:avatar', 'login:info']
            }),
        ]
    });
});
//# sourceMappingURL=provider.config.js.map