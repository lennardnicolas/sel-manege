import { NewsModel } from '../models/news-model.js'
import { News } from '../entities/news.js'
import { DeleteResult } from 'typeorm'

export class NewsService {
    private newsModel: NewsModel = new NewsModel()

    async getOneByID(id: number): Promise<News | null> {
        return this.newsModel.getOneByID(id)
    }

    async getAll(): Promise<News[]> {
        return this.newsModel.getAll()
    }

    async update(news: News): Promise<News> {
        if (!news.id) {
            throw new Error('News id missing')
        }

        if (!(await this.newsModel.getOneByID(news.id))) {
            throw new Error('News dont exist')
        }

        return this.newsModel.save(news)
    }

    async create(news: News): Promise<News> {
        return this.newsModel.save(news)
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.newsModel.delete(id)
    }
}
