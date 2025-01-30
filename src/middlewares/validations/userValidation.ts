import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import validation from "./validation.js";

const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    isTwoFactorEnable: Joi.boolean().required(),
})

export const updateUserValidation = (req: Request, res: Response, next: NextFunction) => {
    validation(req, res, next, updateUserSchema);
}
