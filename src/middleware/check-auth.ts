import { NextFunction, Request, Response } from "express";
import { config } from "../config/index";

export const isAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const apiKey = (req.headers as any)?.apikey;

    if (apiKey === config.secret) {
        next();
    } else {
        return res.status(401).json({ error: "Invalid Token" });
    }
};
