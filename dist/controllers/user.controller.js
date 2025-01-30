var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { catchAsync } from "../utils/catchAsync.js";
class UserController {
    constructor() {
        this.create = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () { }));
        this.getAll = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () { }));
        this.getOne = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () { }));
        this.delete = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () { }));
        this.update = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
export default new UserController();
//# sourceMappingURL=user.controller.js.map