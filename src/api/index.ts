import { Router } from "express";
import { promoServiceRouter } from "./promo-service";

const routes = Router();

routes.use("/promo-code", promoServiceRouter);

export const apiRoutes = routes;
