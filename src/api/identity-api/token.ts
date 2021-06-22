import { Router } from "express";
// import { IResponse } from "src/types/global";
import { ErrorHandler } from "../../helper/error-handler";
import { config } from "../../config";

const route = Router();

// interface GetTokenBody {
//     secret: string;
//     client_id: "site" | "backoffice" | "game";
// }

route.post("/get-connection-token", async (req, res, next) => {
    try {
        const secret = req?.body?.secret;
        const client_id = req?.body?.client_id;

        if (config.secret !== secret) {
            throw new ErrorHandler(401, "");
        }

        if (!client_id) {
            throw new ErrorHandler(400, "client_id does not exist");
        }

        switch (client_id) {
            case "backoffice":
                return await res.json({
                    state: "success",
                    error: null,
                    value: config.backoffice_token,
                });
                break;
            case "site":
                return await res.json({
                    state: "success",
                    error: null,
                    value: config.site_token,
                });
                break;
            case "game":
                return await res.json({
                    state: "success",
                    error: null,
                    value: config.game_token,
                });
                break;
            default:
                throw new ErrorHandler(400, "incorrect parametres");
        }
    } catch (err) {
        return await res.json({
            state: "error",
            error: err,
        });
    }
});

export const tokenServiceRouter = route;
