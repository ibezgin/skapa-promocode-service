import { Router } from "express";
import { Logger } from "../../logger";
import { PromoCodeService } from "../../service/promo-code";
import { PromoCodeEntity } from "../../database/entities/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { ErrorHandler } from "../../helper/error-handler";

const route = Router();

interface ICheckBody {
    promocode: string;
}

route.post<any, IResponse<PromoCodeEntity>, ICheckBody>(
    "/check-code",
    async (req, res, next) => {
        try {
            const promocode = req.body.promocode;

            if (!promocode) {
                throw new ErrorHandler(400, "param does not exist");
            }

            Logger.info(`check promocade: ${promocode}`);

            const promocodeInstance = Container.get(PromoCodeService);

            const code = await promocodeInstance.findByName(promocode);

            promocodeInstance.delete(String(code.id));

            return await res.json({
                state: "success",
                error: null,
                value: code,
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

export const promoCodeServiceRouter = route;
