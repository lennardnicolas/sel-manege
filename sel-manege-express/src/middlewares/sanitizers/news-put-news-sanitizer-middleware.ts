import { Request, Response, NextFunction } from 'express'
import { Sanitizer } from '../../utilities/sanitizer.js'

const sanitizer: Sanitizer = new Sanitizer()

export const newsPutNewsSanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body.title = typeof req.body.title === 'string' ? sanitizer.sanitizeString(req.body.title) : null
    req.body.date = typeof req.body.date === 'string' ? sanitizer.sanitizeString(req.body.date) : null
    req.body.time = typeof req.body.time === 'string' ? sanitizer.sanitizeString(req.body.time) : null
    req.body.location = typeof req.body.location === 'string' ? sanitizer.sanitizeString(req.body.location) : null
    req.body.price = typeof req.body.price === 'number' ? req.body.price : null
    req.body.description = typeof req.body.description === 'string' ? sanitizer.sanitizeString(req.body.description) : null
    next()
}
