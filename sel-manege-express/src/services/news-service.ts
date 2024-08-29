import { NewsModel } from '../models/news-model.js'
import { News } from '../entities/news.js'

export class NewsService {
    private newsModel: NewsModel = new NewsModel()

    async getOneByID(id: number): Promise<News | null> {
        return this.newsModel.getOneByID(id)
    }

    async update(news: News): Promise<News> {
        return this.newsModel.save(news)
    }

    async create(news: News): Promise<News> {
        return this.newsModel.save(news)
    }
}
