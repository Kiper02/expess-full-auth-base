import { NextFunction, Request, Response } from "express";

async function validation(req: Request, res: Response, next: NextFunction, schema: any) {
    const data = req.body;
    if(!data) return res.status(400).json("Нет данных")

    try {
        await schema.validateAsync(data);
        next();
    } catch (error: any) {
        const errorMessage = error.details[0].message.replace(/"/g, '');
        res.status(400).json({ message: errorMessage });
    }
}

export default validation;