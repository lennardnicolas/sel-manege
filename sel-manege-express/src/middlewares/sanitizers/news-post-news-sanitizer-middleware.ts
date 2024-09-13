import { Request, Response, NextFunction } from 'express'
import { Sanitizer } from '../../utilities/sanitizer.js'

const sanitizer: Sanitizer = new Sanitizer()

export const newsPostNewsSanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) {
        req.body.id = typeof req.body.id === 'number' ? req.body.id : null
    }
    if (req.body.title) {
        req.body.title = typeof req.body.title === 'string' ? sanitizer.sanitizeString(req.body.title) : null
    }

    if (req.body.date) {
        req.body.date = typeof req.body.date === 'string' ? sanitizer.sanitizeString(req.body.date) : null
    }

    if (req.body.time) {
        req.body.time = typeof req.body.time === 'string' ? sanitizer.sanitizeString(req.body.time) : null
    }

    if (req.body.location) {
        req.body.location = typeof req.body.location === 'string' ? sanitizer.sanitizeString(req.body.location) : null
    }

    if (req.body.price) {
        req.body.price = typeof req.body.price === 'string' ? sanitizer.sanitizeString(req.body.price) : null
    }

    if (req.body.description) {
        req.body.description =
            typeof req.body.description === 'string' ? sanitizer.sanitizeString(req.body.description) : null
    }

    next()
}
