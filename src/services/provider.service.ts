import { getProviderConfig } from "../config/provider.config.js";
import { BaseOathService } from "./providers/base-outh.service.js";
import { GoogleProvider } from "./providers/google.provider.js";
import { typeOptions } from "./providers/provider.constants.js";
import { YandexProvider } from "./providers/yandex.provider.js";

class ProviderService {
    options: typeOptions;

    constructor(options: typeOptions) {
        this.options = options; 

        for (const provider of this.options.services) {
            provider.baseUrl = this.options.baseUrl;
        }
    }

    public findByService(service: string): BaseOathService | null {
        return this.options.services.find(s => s.name === service) ?? null;
    }
}

const initializeProviderService = async () => {
    const providerConfig = await getProviderConfig(); 
    return new ProviderService(providerConfig); 
};

export const providerService = initializeProviderService();
