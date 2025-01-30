var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nodeMailerConfig } from './../../config/nodemailer.config.js';
import config from './../../utils/config.js';
import nodemailer from 'nodemailer';
import { render } from "@react-email/components";
import { ConfirmationTemplate } from './templates/confirmation.template.js';
import { ResetPasswordTemplate } from './templates/reset-password.template.js';
class NodeMailerService {
    constructor() {
        const config = nodeMailerConfig();
        this.transporter = nodemailer.createTransport(config.transport);
    }
    sendConfirmationEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = config.getOrThrow('ALLOWED_ORIGIN');
            const html = yield render(ConfirmationTemplate({ domain, token }));
            return this.sendMail(email, 'Подтверждение почты', html);
        });
    }
    sendPasswordResetEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = config.getOrThrow('ALLOWED_ORIGIN');
            const html = yield render(ResetPasswordTemplate({ domain, token }));
            return this.sendMail(email, 'Сброс пароля', html);
        });
    }
    sendMail(email, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: config.getOrThrow('MAIL_LOGIN'),
                to: email,
                subject,
                html,
            };
            const info = yield this.transporter.sendMail(mailOptions);
            return info;
        });
    }
}
export default new NodeMailerService();
//# sourceMappingURL=nodemailer.service.js.map