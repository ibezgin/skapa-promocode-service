import { Router } from "express";
import { isAuth } from "../middleware/check-auth";
import { Logger } from "../logger";
import { PromoCodeService } from "../service/promo-code";
import { PromoCodeEntity } from "../database/entities/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { ErrorHandler } from "../helper/error-handler";

const route = Router();

interface IGenerateBody {
    userId: string;
    sale: string;
}

route.post<any, IResponse<{ promocode: string }>, IGenerateBody>(
    "/generate",
    isAuth,
    async (req, res, next) => {
        const { userId, sale } = req.body;

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            if (!userId) {
                throw new ErrorHandler(400, `user id does not exist`);
            }
            if (!sale) {
                throw new ErrorHandler(400, `sale does not exist`);
            }

            if (Number(sale) < 1 || Number(sale) > 99) {
                throw new ErrorHandler(
                    400,
                    "Incorrect parameters, Sale should not contain values < 1 or > 99",
                );
            }

            const promoCode = await promocodeInstance.generate(userId, sale);
            Logger.info(
                `generate new promocode: ${promoCode.name} by user: ${userId}`,
            );

            return await res.json({
                state: "success",
                error: null,
                value: { promocode: promoCode.name },
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

route.get<any, IResponse<{ promocode: PromoCodeEntity[] }>, IGenerateBody>(
    "/:userId",
    isAuth,
    async (req, res, next) => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                throw new ErrorHandler(400, "userId does not exist");
            }

            const promocodeInstance = Container.get(PromoCodeService);

            const promocode = await promocodeInstance.find({ userId });

            return await res.json({
                state: "success",
                error: null,
                value: { promocode },
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

export const promoServiceRouter = route;
