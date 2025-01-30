import { NextFunction, Request, Response } from "express";

const checkPasswordRepeat = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password !== req.body.passwordRepeat) {
        res.status(400).json("Пароли не совпадают");
        return;
    }
    next();
};

export default checkPasswordRepeat;
