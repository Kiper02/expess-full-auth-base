import { nodeMailerConfig } from './../../config/nodemailer.config.js';
import config from './../../utils/config.js';
import nodemailer from 'nodemailer'
import { render } from "@react-email/components"
import {ConfirmationTemplate} from './templates/confirmation.template.js'
import {ResetPasswordTemplate} from './templates/reset-password.template.js'
import {TwoFactorAuthTemplate} from './templates/two-factor-auth.template.js'

class NodeMailerService {
    private transporter: nodemailer.Transporter;
    public constructor() {
        const config = nodeMailerConfig()
        this.transporter = nodemailer.createTransport(config.transport)
    }

    public async sendConfirmationEmail(email: string, token: string) {
        const domain = config.getOrThrow('ALLOWED_ORIGIN')
        const html = await render(ConfirmationTemplate({domain, token}))
        return this.sendMail(email, 'Подтверждение почты', html);
    }

    public async sendPasswordResetEmail(email: string, token: string) {
        const domain = config.getOrThrow('ALLOWED_ORIGIN')
        const html = await render(ResetPasswordTemplate({domain, token}))
        return this.sendMail(email, 'Сброс пароля', html);
    }

    public async sendTwoFactorTokenEmail(email: string, token: string) {
        const domain = config.getOrThrow('ALLOWED_ORIGIN')
        const html = await render(TwoFactorAuthTemplate({token}))
        return this.sendMail(email, 'Потдверждение вашей личности', html);
    }

    private async sendMail(email: string, subject: string, html: string) {
        const mailOptions = {
            from: config.getOrThrow('MAIL_LOGIN'),
            to: email,
            subject,
            html,
        };

        const info = await this.transporter.sendMail(mailOptions);
        return info;
    }
}

export default new NodeMailerService()