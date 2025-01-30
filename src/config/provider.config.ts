import { GoogleProvider } from "../services/providers/google.provider.js";
import { typeOptions } from "../services/providers/provider.constants.js";
import { YandexProvider } from "../services/providers/yandex.provider.js";
import config from "../utils/config.js";

export const getProviderConfig = async(): Promise<typeOptions> => ({
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
})