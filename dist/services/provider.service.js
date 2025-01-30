var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProviderConfig } from "../config/provider.config.js";
class ProviderService {
    constructor(options) {
        this.options = options;
        for (const provider of this.options.services) {
            provider.baseUrl = this.options.baseUrl;
        }
    }
    findByService(service) {
        var _a;
        return (_a = this.options.services.find(s => s.name === service)) !== null && _a !== void 0 ? _a : null;
    }
}
const initializeProviderService = () => __awaiter(void 0, void 0, void 0, function* () {
    const providerConfig = yield getProviderConfig();
    return new ProviderService(providerConfig);
});
export const providerService = initializeProviderService();
//# sourceMappingURL=provider.service.js.map