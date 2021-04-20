import cors from "cors";
import { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config } from "../config";
import { apiRoutes } from "../api/index";

export const expressLoader = (app: Application): void => {
    // Health Check endpoints
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });
    app.enable("trust proxy");

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Use Helmet to secure the app by setting various HTTP headers
    app.use(helmet());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    // Load API routes
    app.use(`/${config.endpointPrefix}`, apiRoutes);
};
