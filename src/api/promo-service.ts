import { Router } from "express";
import { isAuth } from "../middleware/check-auth";
import { Helper } from "../helper";
import { Logger } from "../logger";

const route = Router();

route.post("/generate", isAuth, (req, res, next) => {
    const helper = new Helper();
    try {
        const generatedPromocode = helper.promoCode.generate();

        const promocode = generatedPromocode[0];
        Logger.info(JSON.stringify(req.headers));
        return res.json({ state: "success", promocode });
    } catch (err) {
        return res.json({ state: "error" });
    }
});

export const promoServiceRouter = route;
