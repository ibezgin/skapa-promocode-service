import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

let databaseUrl = process.env.MONGODB_URI;

const port = process.env.PORT || 3000;

export const config = {
    port,
    databaseUrl,
    endpointPrefix: process.env.ENDPOINT_PREFIX || "api",
    secret:
        process.env.SECRET || "WxW0NZBes2BO0RizsjUgj2snooPj3G8KDJm5gTD04gy1wsw",
    backoffice_token: process.env.BACKOFFICE_TOKEN || "backoffice",
    game_token: process.env.GAME_TOKEN || "game",
    site_token: process.env.SITE_TOKEN || "site",
};
