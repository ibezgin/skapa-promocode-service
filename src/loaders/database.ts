import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { Logger } from "../logger";

export const databaseLoader = async (): Promise<Connection> => {
    useContainer(Container);
    try {
        return await createConnection();
    } catch (err) {
        Logger.debug(err);
        throw err;
    }
};
