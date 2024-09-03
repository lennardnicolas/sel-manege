import { dataSource } from '../data-source.js'
import { News } from '../entities/news.js'

export class NewsModel {
    async getOneByID(id: number): Promise<News | null> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.findOne({ where: { id } })
    }

    async getAll(): Promise<News[]> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.find({
            order: {
                id: 'DESC',
            },
        })
    }

    async save(news: News): Promise<News> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.save(news)
    }
}
