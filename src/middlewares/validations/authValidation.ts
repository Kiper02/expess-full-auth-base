import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import validation from "./validation.js";

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordRepeat: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    code: Joi.string(),
})

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
})

const newPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
})


export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
    validation(req, res, next, registerSchema);
}
export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    validation(req, res, next, loginSchema);
}
export const resetPasswordValidation = (req: Request, res: Response, next: NextFunction) => {
    validation(req, res, next, resetPasswordSchema);
}
export const newPasswordValidation = (req: Request, res: Response, next: NextFunction) => {
    validation(req, res, next, newPasswordSchema);
}