import { Router } from "express";
import { Logger } from "../../logger";
import { PromoCodeService } from "../../service/promo-code";
import { IResponse } from "src/types/global";
import { Container } from "typedi";
import { PromoCodeEntity } from "src/database/entities/promo-code";

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
        const { name, sale, creator } = req.body;

        try {
            const promocodeInstance = Container.get(PromoCodeService);

            const promoCode = await promocodeInstance.create({
                name,
                sale,
                creator,
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

// route.patch<{ id: string }, IResponse<boolean>, any, IGetAllParams>(
//     "/update/:id",
//     async (req, res, next) => {
//         const { count, offset } = req.query;

//         try {
//             const promocodeInstance = Container.get(PromoCodeService);

//             const promoCode = await promocodeInstance.findByPaginate(
//                 Number(count),
//                 Number(offset),
//             );

//             Logger.info(
//                 `find all promo-code with params count: ${count}, offset: ${offset}`,
//             );

//             return await res.json({
//                 state: "success",
//                 error: null,
//                 value: promoCode,
//             });
//         } catch (err) {
//             return await res.json({
//                 state: "error",
//                 error: err,
//             });
//         }
//     },
// );
export const promoCodeServiceRouter = route;
