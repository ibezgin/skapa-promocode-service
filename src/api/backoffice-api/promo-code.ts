import { Router } from "express";
import { Logger } from "../../logger";
import { PromoCodeService } from "../../service/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { PromoCodeEntity } from "src/database/entities/promo-code";
import { ErrorHandler } from "../../helper/error-handler";
import moment from "moment";

const route = Router();

interface IGetAllParams {
    count: number;
    offset: number;
}

interface IGetAllResponse {
    data: PromoCodeEntity[];
    count: number;
}

interface IDeleteParam {
    id: string;
}

route.get<any, IResponse<IGetAllResponse>, any, IGetAllParams>(
    "/get-all",
    async (req, res, next) => {
        const { count, offset } = req.query;

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            const promoCode = await promocodeInstance.findByPaginate(
                Number(count),
                Number(offset),
            );

            Logger.info(
                `find all promo-code with params count: ${count}, offset: ${offset}`,
            );

            return await res.json({
                state: "success",
                error: null,
                value: promoCode,
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

route.post<any, IResponse<boolean>, PromoCodeEntity>(
    "/add",
    async (req, res, next) => {
        const { name, sale, adminId, QRCodeId } = req.body;

        if (!name) {
            throw new ErrorHandler(400, `name does not exist`);
        }

        if (!sale) {
            throw new ErrorHandler(400, `sale does not exist`);
        }

        if (!adminId) {
            throw new ErrorHandler(400, `adminId does not exist`);
        }

        if (!QRCodeId) {
            throw new ErrorHandler(400, `QRCodeId does not exist`);
        }

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            const createdAt = moment.utc().format("X");

            const promoCode = await promocodeInstance.create({
                name,
                sale,
                adminId,
                QRCodeId,
                createdAt,
            });

            Logger.info(`create new promocode with id: ${promoCode.id}`);

            return await res.json({
                state: "success",
                error: null,
                value: true,
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

route.post<any, IResponse<boolean>, { promoCodes: PromoCodeEntity[] }>(
    "/add-many",
    async (req, res, next) => {
        const { promoCodes } = req.body;

        let ids: string[] = [];

        if (!promoCodes && Boolean(promoCodes.length)) {
            throw new ErrorHandler(400, `promo codes does not exist`);
        }

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            const createdAt = moment.utc().format("X");

            for (const promoCode of promoCodes) {
                const _promoCode = await promocodeInstance.create({
                    name: promoCode.name,
                    sale: promoCode.sale,
                    adminId: promoCode.adminId,
                    QRCodeId: promoCode.QRCodeId,
                    createdAt,
                });
                ids.push(String(_promoCode.id));
            }

            Logger.info(`create new promocodes with ids: ${ids.join()}`);

            return await res.json({
                state: "success",
                error: null,
                value: true,
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

route.delete<IDeleteParam, IResponse<boolean>>(
    "/delete/:id",
    async (req, res, next) => {
        const { id } = req.params;

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            const promoCode = await promocodeInstance.delete(id);

            Logger.info(`delete id: ${id}`);

            return await res.json({
                state: "success",
                error: null,
                value: promoCode,
            });
        } catch (err) {
            return await res.json({
                state: "error",
                error: err,
            });
        }
    },
);

route.patch<
    { id: string },
    IResponse<boolean>,
    { sale: number; name: string; QRCodeId: string; adminId: string },
    any
>("/update/:id", async (req, res, next) => {
    const { id } = req.params;

    const { sale, name, QRCodeId, adminId } = req.body;

    if (!name) {
        throw new ErrorHandler(400, `name does not exist`);
    }

    if (!sale) {
        throw new ErrorHandler(400, `sale does not exist`);
    }

    if (!adminId) {
        throw new ErrorHandler(400, `adminId does not exist`);
    }

    if (!QRCodeId) {
        throw new ErrorHandler(400, `QRCodeId does not exist`);
    }

    try {
        const promocodeInstance = Container.get(PromoCodeService);

        const promoCode = await promocodeInstance.update(id, {
            sale,
            name,
            QRCodeId,
            adminId,
        });

        Logger.info(
            `update promocode id: ${id}, params: ${JSON.stringify(req.body)}`,
        );

        return await res.json({
            state: "success",
            error: null,
            value: Boolean(promoCode),
        });
    } catch (err) {
        return await res.json({
            state: "error",
            error: err,
        });
    }
});
export const promoCodeServiceRouter = route;
