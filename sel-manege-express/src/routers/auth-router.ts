import { Request, Response, Router } from 'express'
import { AuthController } from '../controllers/auth-controller.js'
import { jsonValidatorMiddleware } from '../middlewares/json-validator-middleware.js'
import { authPostLoginJsonValidatorShema } from '../schemas/auth-post-login-json-validator-shema.js'
import { authPostLoginSanitizerMiddleware } from '../middlewares/sanitizers/auth-post-login-sanitizer-middleware.js'

const authRouter: Router = Router()
const authController: AuthController = new AuthController()

// Return the email of the connected user, empty string if not connected
authRouter.get('/email', (req: Request, res: Response) => authController.getEmailOfConnected(req, res))

// Return if the user is authenticated or not
authRouter.get('/authenticated', (req: Request, res: Response) => authController.isAuthenticated(req, res))

// Destroy the session to logout
authRouter.get('/logout', (req: Request, res: Response) => authController.logout(req, res))

// Try to login and return if the login attempt worked or not
authRouter.post(
    '/login',
    authPostLoginSanitizerMiddleware,
    jsonValidatorMiddleware(authPostLoginJsonValidatorShema),
    (req: Request, res: Response) => authController.login(req, res),
)

export default authRouter
