import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { Logger } from "../logger";
import { config } from "../config";
export const databaseLoader = async (): Promise<Connection> => {
    useContainer(Container);
    try {
        // return await createConnection({
        //     type: "mongodb",
        //     url: config.databaseUrl,
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     synchronize: true,
        //     logging: false,
        //     entities: ["./src/database/entities/**/*.ts"],
        //     cli: {
        //         entitiesDir: "./src/database/entities",
        //     },
        // });
        return await createConnection();
    } catch (err) {
        Logger.debug(err);
        throw err;
    }
};
