import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

let databaseUrl = process.env.MONGODB_URI;

const port = process.env.PORT || 8080;

export const config = {
    port,
    databaseUrl,
    endpointPrefix: process.env.ENDPOINT_PREFIX || "api",
    secret:
        process.env.SECRET || "WxW0NZBes2BO0RizsjUgj2snooPj3G8KDJm5gTD04gy1wsw",
};
