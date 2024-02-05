import { Body, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { NewsCreateDto } from "../models/dtos/news-create-dto";
import { NewsRepository } from "../repositories/news.repository";

@JsonController('/news')
@Service()
export class NewsController{
    constructor(public newsRepository: NewsRepository) {}

    @Get('/test')
    public async getTestController() : Promise<string> {
        return 'Looks like it is working!';
    }

    @Post('/test')
    public async testTheModelsWithInBuiltClassTransformer(@Body() news : NewsCreateDto) {
        return news;
    }

    @Post('/')
    public async createNews(@Body() news : NewsCreateDto) {
        const createdNews = await this.newsRepository.createNews(news);

        if(createdNews) {
            return createdNews;
        } else {
            return null;
        }
    }
}