import { expressLoader } from "./express";
import { Application } from "express";
import { Container } from "typedi";
import { Logger } from "../logger";
import { databaseLoader } from "./database";

export const defaultLoader = async (app: Application) => {
    Container.set("logger", Logger);
    try {
        await databaseLoader();
    } catch (err) {
        throw err;
    }
    Logger.info("Database loaded and connected!");

    expressLoader(app);
    Logger.info("Express loaded!");
};
