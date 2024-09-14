import { Request, Response, NextFunction } from 'express'

export const newsDeleteNewsSanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) {
        req.body.id = typeof req.body.id === 'number' ? req.body.id : null
    }

    next()
}
