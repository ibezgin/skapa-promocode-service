import express from "express";

export const server = async () => {
    const app = express();

    const loaders = await import("./loaders/index");

    loaders.defaultLoader(app);

    return app;
};
