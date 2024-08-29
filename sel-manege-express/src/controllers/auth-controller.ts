import { Request, Response } from "express"
import { AuthService } from "../services/auth-service.js"
import { Auth } from "../entities/auth.js"

export class AuthController {
    authService: AuthService = new AuthService()
    
    async login(req: Request, res: Response) {
        const email: string = req.body.email
        const pass: string = req.body.pass

        try {
            this.authService.canLogin(email, pass).then((canLoginID: number | null) => {
                if (canLoginID) {
                    req.session.authenticatedUserID = canLoginID
                    res.json(true)
                } else {
                    res.json(false)
                }
            })
        } catch (err) {
            const baseErrMessage: string = 'Error when logging in'
            console.log(baseErrMessage + ' : ' + err)
            res.status(500).json(baseErrMessage)
        }
    }

    async logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) {
                const baseErrMessage: string = 'Error when destroying session'
                console.log(baseErrMessage + ' : ' + err)
                res.status(500).json(baseErrMessage)
            } else {
                res.json(true)
            }
        })
    }

    isAuthenticated(req: Request, res: Response) {
        res.json(req.session.authenticatedUserID ? true : false)
    }

    async getEmailOfConnected(req: Request, res: Response) {
        let email: string = ''

        if (req.session.authenticatedUserID) {
            const auth: Auth | null = await this.authService.getOneByID(req.session.authenticatedUserID)

            if (auth) {
                email = auth.email
            }
        }

        res.json(email)
    }
}