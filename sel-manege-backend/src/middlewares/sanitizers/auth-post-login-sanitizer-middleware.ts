import { Request, Response, NextFunction } from 'express'
import { Sanitizer } from '../../utilities/sanitizer.js'

const sanitizer: Sanitizer = new Sanitizer()

export const authPostLoginSanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email) {
        req.body.email = typeof req.body.email === 'string' ? sanitizer.sanitizeString(req.body.email) : null
    }

    if (req.body.pass) {
        req.body.pass = typeof req.body.pass === 'string' ? req.body.pass : null
    }

    next()
}
