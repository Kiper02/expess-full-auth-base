import Joi from "joi";
import validation from "./validation.js";
const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordRepeat: Joi.string().min(6).required()
});
const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});
const newPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
});
export const registerValidation = (req, res, next) => {
    validation(req, res, next, registerSchema);
};
export const resetPasswordValidation = (req, res, next) => {
    validation(req, res, next, resetPasswordSchema);
};
export const newPasswordValidation = (req, res, next) => {
    validation(req, res, next, newPasswordSchema);
};
//# sourceMappingURL=authValidation.js.map