import { Service } from "typedi";
import DatabaseMiddleware from "../middlewares/database.middleware";
import { NewsCreateDto } from "../models/dtos/news-create-dto";
import { Repository } from "sequelize-typescript";
import { News } from "../models/entities/news";

@Service()
export class NewsRepository {
    public newsRepository : Repository<News>

    constructor(public databaseMiddleware : DatabaseMiddleware) {
        this.newsRepository = databaseMiddleware.getDatabaseInstance().getRepository(News);
    }

    public async createNews(news : NewsCreateDto) {
        try {
            const newsCreated = await this.newsRepository.create({ ...news }, { raw: true });
            return newsCreated;
        } catch (error) {
            console.error(`Error occured due to`, error);
            return null;
        }
    }
}