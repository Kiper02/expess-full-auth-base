var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hash } from "argon2";
import prisma from "../config/prisma.js";
class UserService {
    create(email, password, displayName, picture, method, isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.create({
                data: {
                    email,
                    password: password ? yield hash(password) : '',
                    displayName,
                    picture,
                    method,
                    isVerified
                },
                include: {
                    accounts: true
                }
            });
            return user;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
                include: { accounts: true }
            });
            if (!user) {
                throw new Error("Пользователь не найден, пожалуйста проверьте введенные данные");
            }
            return user;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
                include: { accounts: true }
            });
            return user;
        });
    }
}
export default new UserService();
//# sourceMappingURL=user.service.js.map