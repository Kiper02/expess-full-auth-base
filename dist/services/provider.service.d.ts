import { BaseOathService } from "./providers/base-outh.service.js";
import { typeOptions } from "./providers/provider.constants.js";
declare class ProviderService {
    options: typeOptions;
    constructor(options: typeOptions);
    findByService(service: string): BaseOathService | null;
}
export declare const providerService: Promise<ProviderService>;
export {};
