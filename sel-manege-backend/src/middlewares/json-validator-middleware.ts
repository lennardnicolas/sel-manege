import { Request, Response, NextFunction } from 'express'
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

export const jsonValidatorMiddleware = (responseSchema: object) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv()

        ajvFormats(ajv) // Add format support for ajv

        const validate = ajv.compile(responseSchema)

        const valid = validate(req.body)

        if (valid) {
            next()
        } else {
            res.status(500).json(validate.errors)
        }
    }
}
