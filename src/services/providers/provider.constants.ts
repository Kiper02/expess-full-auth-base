import { BaseOathService } from "./base-outh.service.js";

export const ProviderOptionsSymbol = Symbol();

export type typeOptions = {
    baseUrl: string,
    services: BaseOathService[]
}