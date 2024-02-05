import "reflect-metadata";
import dotenv from "dotenv";
import express, { Express } from "express";
import { Container } from "typedi";
import { useExpressServer, useContainer as routingContainer } from "routing-controllers";
import bodyParser from "body-parser";
import DatabaseMiddleware from "./middlewares/database.middleware";

class App {
    private baseDirectory : string;
    private expressApp : Express

    // Middleware Instances
    private databaseMiddleware : DatabaseMiddleware;
    
    constructor() {
        this.environmentDeterminer();
        this.baseDirectory = __dirname;
        this.expressApp = express();
        routingContainer(Container);

        useExpressServer(this.expressApp, {
            routePrefix: process.env.MAMLAKHA_ROUTE_PREFIX,
            defaultErrorHandler: false,
            controllers: [this.baseDirectory + `/**/controllers/*.ts`]
        });

        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());

        this.databaseMiddleware = new DatabaseMiddleware();
    }

    run() {
        this.expressApp.listen(process.env.MAMLAKHA_REST_API_PORT, () => {
            console.info(`Hello there, it's Mamlakha app and it's running on port ${process.env.MAMLAKHA_REST_API_PORT} 🤘`);
        });

        this.databaseMiddleware.connectToDatabase();
    }

    get expressAppInstance() : Express {
        return this.expressApp;
    }

    private environmentDeterminer() {
        const environment : string = process.env.NODE_ENV ?? "";
        console.log(`Environment is`, environment);

        switch (environment) {
            case "development":
                dotenv.config({ path: "./.env.development" });
                break;
            case "testing":
                dotenv.config({ path: "./.env.testing" });
                break;
            default:
                console.log("Defaulting to development");
                dotenv.config({ path: "./.env.development" });
                break;
        }
    }
}

const main : App = new App();
main.run();