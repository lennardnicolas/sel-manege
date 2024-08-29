import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import ConnectRedis from 'connect-redis'
import './interfaces/session-data.js'
import authRouter from './routers/auth-router.js'
import newsRouter from './routers/news-router.js'
import userRouter from './routers/user-router.js'
import cors from 'cors'

export class ExpressServer {
    start() {
        const expressPort: number = process.env.SEL_MANEGE_EXPRESS_PORT
            ? parseInt(process.env.SEL_MANEGE_EXPRESS_PORT, 10)
            : 0
        const expressSessionSecret: string = process.env.SEL_MANEGE_EXPRESS_SESSION_SECRET
            ? process.env.SEL_MANEGE_EXPRESS_SESSION_SECRET
            : 'secret not loaded'
        const redisHost: string = process.env.SEL_MANEGE_REDIS_HOST ? process.env.SEL_MANEGE_REDIS_HOST : ''
        const redisPort: number = process.env.SEL_MANEGE_REDIS_PORT
            ? parseInt(process.env.SEL_MANEGE_REDIS_PORT, 10)
            : 0
        const redisPass: string = process.env.SEL_MANEGE_REDIS_PASS ? process.env.SEL_MANEGE_REDIS_PASS : ''
        const angularUrl: string = process.env.SEL_MANEGE_ANGULAR_URL ? process.env.SEL_MANEGE_ANGULAR_URL : ''
        const domain: string = process.env.SEL_MANEGE_DOMAIN ? process.env.SEL_MANEGE_DOMAIN : ''

        const app = express()

        const corsOptions = {
            origin: angularUrl,
            methods: 'GET, POST', // Other type are HEAD,PUT,PATCH,DELETE
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }

        const redisClient = new Redis({
            host: redisHost,
            port: redisPort,
            password: redisPass,
        })

        const redisStore = new ConnectRedis({ client: redisClient })

        const sessionMiddleware = session({
            store: redisStore,
            secret: expressSessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                //houres * minutes * seconds * miliseconds, session will be valid 6 houres
                maxAge: 6 * 60 * 60 * 1000,
                domain: domain,
                httpOnly: true,
                sameSite: 'strict',
            },
        })

        app.use(cors(corsOptions)) // Allow request from the are in corsOptions
        app.use(express.json()) // Allow to pase json body
        app.use(sessionMiddleware) // Session
        app.use(authRouter)
        app.use(newsRouter)
        app.use(userRouter)

        console.log('Express port : ' + expressPort.toString())
        console.log('Express session secret : ' + expressSessionSecret)
        console.log('Redis host : ' + redisHost)
        console.log('Redis port : ' + redisPort.toString())
        console.log('Redis pass : ' + redisPass)
        console.log('Angular url : ' + angularUrl)
        console.log('Domaine : ' + domain)

        app.listen(expressPort, () => {
            console.log(`Server is running on http://localhost:` + expressPort.toString())
        })
    }
}
