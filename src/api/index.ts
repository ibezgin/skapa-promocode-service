import { Router } from "express";
import { backofficeApi } from "./backoffice-api";
import { gameApi } from "./game-api";
// import { promoServiceRouter } from "./promo-service";
import { siteApi } from "./site-api";

const routes = Router();

// routes.use("/promo-code", promoServiceRouter);

routes.use("/backoffice-api", backofficeApi);

routes.use("/game-api", gameApi);

routes.use("/site-api", siteApi);

export const apiRoutes = routes;
