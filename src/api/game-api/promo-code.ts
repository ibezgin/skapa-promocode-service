import { Router } from "express";
import { Logger } from "../../logger";
import { PromoCodeService } from "../../service/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { ErrorHandler } from "../../helper/error-handler";

const route = Router();

interface IGenerateBody {
    userId: string;
    sale: string;
}

route.post<any, IResponse<string>, IGenerateBody>(
    "/generate",
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
                value: promoCode.name,
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
