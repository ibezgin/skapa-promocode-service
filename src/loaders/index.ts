import { expressLoader } from "./express";
import { Application } from "express";

export const defaultLoader = (app: Application) => {
    expressLoader(app);
};
