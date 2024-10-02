import { Request, Response, NextFunction } from 'express'

export const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.authenticatedUserID) {
        next()
    } else {
        res.status(403).json('Not authenticated')
    }
}
