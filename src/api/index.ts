import { NextFunction, Request, Response, Router } from "express";
import _ from "lodash";
import { backofficeApi } from "./backoffice-api";
import { gameApi } from "./game-api";
import { siteApi } from "./site-api";
import { config } from "../config/index";

const routes = Router();

routes.use(
    "/backoffice-api",
    (req: Request, res: Response, next: NextFunction) => {
        const apiKey = _.get(req.headers, "skapa-api-key");

        if (apiKey === config.backoffice_token) {
            next();
        } else {
            return res.status(401).send();
        }
    },
    backofficeApi,
);

routes.use(
    "/game-api",
    (req: Request, res: Response, next: NextFunction) => {
        const apiKey = _.get(req.headers, "skapa-api-key");

        if (apiKey === config.game_token) {
            next();
        } else {
            return res.status(401).send();
        }
    },
    gameApi,
);

routes.use(
    "/site-api",
    (req: Request, res: Response, next: NextFunction) => {
        const apiKey = _.get(req.headers, "skapa-api-key");

        if (apiKey === config.site_token) {
            next();
        } else {
            return res.status(401).send();
        }
    },
    siteApi,
);

export const apiRoutes = routes;
