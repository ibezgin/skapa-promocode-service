import { Router } from "express";
import { Logger } from "../../logger";
import { PromoCodeService } from "../../service/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { ErrorHandler } from "../../helper/error-handler";
import { PromoCodeEntity } from "../../database/entities/promo-code";
import _ from "lodash";

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

route.get<
    { qrCode: string },
    IResponse<Pick<PromoCodeEntity, "sale" | "name">>
>("/qr/:qrCode", async (req, res, next) => {
    const { qrCode } = req.params;

    try {
        const promocodeInstance = Container.get(PromoCodeService);

        if (!qrCode) {
            throw new ErrorHandler(400, `qr code does not exist`);
        }

        const promoCode = await promocodeInstance.findByQrCode(qrCode);

        const codeData = promoCode[0];

        Logger.info(`find by qr: ${qrCode}`);
        if (codeData) {
            return await res.json({
                state: "success",
                error: null,
                value: _.pick(codeData, ["sale", "name"]),
            });
        } else {
            throw new ErrorHandler(404, "qr code not found");
        }
    } catch (err) {
        return await res.json({
            state: "error",
            error: err,
        });
    }
});

export const promoCodeServiceRouter = route;
