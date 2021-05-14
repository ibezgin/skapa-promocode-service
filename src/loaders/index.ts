import { expressLoader } from "./express";
import { Application } from "express";
import { Container } from "typedi";
import { Logger } from "../logger";
import { databaseLoader } from "./database";
import hsp from "heroku-self-ping";

export const defaultLoader = async (app: Application) => {
    Container.set("logger", Logger);
    // skapa - promocode.herokuapp.com;

    hsp(
        process.env.HEROKU_APP_NAME
            ? process.env.HEROKU_APP_NAME
            : "skapa-promocode.herokuapp.com",
    );

    try {
        await databaseLoader();
    } catch (err) {
        throw err;
    }
    Logger.info("Database loaded and connected!");

    expressLoader(app);
    Logger.info("Express loaded!");
};
