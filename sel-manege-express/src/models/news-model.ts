import { dataSource } from '../data-source.js'
import { News } from '../entities/news.js'
import { DeleteResult } from 'typeorm'

export class NewsModel {
    getOneByID(id: number): Promise<News | null> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.findOne({ where: { id } })
    }

    getAll(): Promise<News[]> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.find({
            order: {
                id: 'DESC',
            },
        })
    }

    save(news: News): Promise<News> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.save(news)
    }

    delete(id: number): Promise<DeleteResult> {
        const newsRepository = dataSource.getRepository(News)
        return newsRepository.delete(id)
    }
}
