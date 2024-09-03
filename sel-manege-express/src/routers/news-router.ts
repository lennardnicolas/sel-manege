import { Request, Response, Router } from 'express'
import { NewsController } from '../controllers/news-controller.js'
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware.js'
import { jsonValidatorMiddleware } from '../middlewares/json-validator-middleware.js'
import { newsPutNewsJsonValidatorShema } from '../schemas/news-put-news-json-validator-shema.js'
import { newsPutNewsSanitizerMiddleware } from '../middlewares/sanitizers/news-put-news-sanitizer-middleware.js'

const newsRouter: Router = Router()
const newsController: NewsController = new NewsController()

// Create a news (only if authenticated)
newsRouter.put(
    '/news',
    newsPutNewsSanitizerMiddleware,
    jsonValidatorMiddleware(newsPutNewsJsonValidatorShema),
    isAuthenticatedMiddleware,
    (req: Request, res: Response) => newsController.create(req, res),
)

// Get all news
newsRouter.get(
    '/allnews',
    (req: Request, res: Response) => newsController.getAll(req, res),
)

export default newsRouter
