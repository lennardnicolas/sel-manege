import { Request, Response } from 'express'
import { News } from '../entities/news.js'
import { NewsService } from '../services/news-service.js'

export class NewsController {
    private newsService = new NewsService()

    async create(req: Request, res: Response) {
        const title: string = req.body.title
        const description: string = req.body.description
        const date: Date | null = req.body.date ? new Date(req.body.date) : null
        const time: string | null = req.body.time ? req.body.time : null
        const location: string | null = req.body.location ? req.body.location : null
        const price: string | null = req.body.price ? req.body.price : null

        try {
            const news = new News()

            news.userId = req.session.authenticatedUserID!
            news.title = title
            news.description = description
            news.time = time
            news.date = date
            news.location = location
            news.price = price

            
            await this.newsService.create(news)

            res.json('News added')
        } catch (err) {
            const baseErrMessage: string = 'Error when adding news'
            console.log(baseErrMessage + ' : ' + err)
            res.status(500).json(baseErrMessage)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            res.json(await this.newsService.getAll())
        } catch (err) {
            const baseErrMessage: string = 'Error fetching news'
            console.log(baseErrMessage + ' : ' + err)
            res.status(500).json(baseErrMessage)
        }
    }
}
