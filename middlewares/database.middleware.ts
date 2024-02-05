import { Sequelize } from "sequelize-typescript";
import { Service } from "typedi";
import { User } from "../models/entities/user";
import { News } from "../models/entities/news";

@Service()
export default class DatabaseMiddleware {
    private databaseInstance : Sequelize;

    constructor() {
        this.databaseInstance = new Sequelize({
            database: process.env.MAMLAKHA_DATABASE_NAME,
            dialect: "sqlite",
            host: process.env.MAMLAKHA_DATABASE_HOST,
            username: process.env.MAMLAKHA_DATABASE_USERNAME,
            password: process.env.MAMLAKHA_DATABASE_PASSWORD,
            storage: process.env.MAMLAKHA_DATABASE_STORAGE_PATH,
            logging(sql, timing) {
                console.log("The SQL statement from Sequelize executed is", sql, timing);
            },
            query: {
                raw: true
            },
            models: [User, News],
            repositoryMode: true,
        });
    }

    public async connectToDatabase() {
        try {
            await this.databaseInstance.authenticate();
            if(process.env.ENVIRONMENT_PROFILE === "development") {
                await this.databaseInstance.sync({ alter: true, force: true });
            }

            console.log("Connection to database has been established successfully");
        } catch(error) {
            console.error("Unable to connect to database due to", error);
        }
    }

    public getDatabaseInstance() {
        return this.databaseInstance;
    }
}