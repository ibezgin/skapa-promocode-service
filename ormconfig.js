/* eslint-disable @typescript-eslint/no-var-requires */
const config =
    process.env.NODE_ENV === "production"
        ? require("./dist/config").config
        : require("./dist/config").config;

const srcConfig = {
    type: "mongodb",
    url: config.databaseUrl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: ["./src/database/entities/**/*.ts"],
    cli: {
        entitiesDir: "./src/database/entities",
    },
};

const distConfig = {
    type: "mongodb",
    url: config.databaseUrl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: false,
    logging: false,
    entities: ["dist/api/entities/**/*.js"],
    cli: {
        entitiesDir: "dist/api/entities",
    },
};

module.exports = process.env.NODE_ENV === "production" ? distConfig : srcConfig;
