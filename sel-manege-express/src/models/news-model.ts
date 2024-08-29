import { dataSource } from '../data-source.js'
import { News } from '../entities/news.js'

export class NewsModel {
    async getOneByID(id: number): Promise<News | null> {
        const userRepository = dataSource.getRepository(News)
        return await userRepository.findOne({ where: { id } })
    }

    async save(news: News): Promise<News> {
        const userRepository = dataSource.getRepository(News)
        return await userRepository.save(news)
    }
}
