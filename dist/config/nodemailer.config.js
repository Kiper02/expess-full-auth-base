import config from "../utils/config.js";
import { isDev } from "../utils/is-dev.util.js";
export const nodeMailerConfig = () => ({
    transport: {
        host: config.getOrThrow('MAIL_HOST'),
        port: Number(config.getOrThrow('MAIL_PORT')),
        secure: !isDev(),
        auth: {
            user: config.getOrThrow('MAIL_LOGIN'),
            pass: config.getOrThrow('MAIL_PASSWORD'),
        },
    },
    defaults: {
        from: `"Kiper" ${config.getOrThrow('MAIL_LOGIN')}`
    }
});
// import config from "../utils/config.js";
// import { isDev } from "../utils/is-dev.util.js";
// export const nodeMailerConfig = () => ({
//   host: config.getOrThrow("MAIL_HOST"),
//   port: config.getOrThrow("MAIL_PORT"),
//   secure: isDev(),
//   auth: {
//     user: config.getOrThrow("MAIL_LOGIN"),
//     pass: config.getOrThrow("MAIL_PASSWORD"),
//   },
//   defaults: {
//     from: `"Kiper" ${config.getOrThrow("MAIL_LOGIN")}`,
//   },
// });
//# sourceMappingURL=nodemailer.config.js.map