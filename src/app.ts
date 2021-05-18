import { config } from "./config";
import { Logger } from "./logger";
import { server } from "./server";
import hsp from "heroku-self-ping";

const startServer = async () => {
    const app = await server();
    const isHsp = hsp(
        process.env.HEROKU_APP_NAME
            ? process.env.HEROKU_APP_NAME
            : "skapa-promocode.herokuapp.com",
        { verbose: true, interval: 20000 },
    );

    Logger.info(`hsp: ${isHsp}`);

    app.listen(config.port, () => {
        Logger.info(`
          ################################################
          #  Server listening on port: ${config.port}    
          ################################################
        `);
    });
};

startServer();
