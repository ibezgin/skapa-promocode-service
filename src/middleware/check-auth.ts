import { NextFunction, Request, Response } from "express";
import { config } from "../config/index";
import _ from "lodash";

export const isAuth = async <T>(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const apiKey = _.get(req.headers, "skapa-api-key");

    if (apiKey === config.secret) {
        next();
    } else {
        return res.status(401).send({ error: "Invalid Token" });
    }
};
