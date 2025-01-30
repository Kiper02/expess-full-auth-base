import { BaseOathService } from "./base-outh.service.js";
export declare const ProviderOptionsSymbol: unique symbol;
export type typeOptions = {
    baseUrl: string;
    services: BaseOathService[];
};
