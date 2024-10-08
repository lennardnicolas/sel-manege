import { AuthModel } from '../models/auth-model.js'
import { Auth } from '../entities/auth.js'
import bcrypt from 'bcrypt'

export class AuthService {
    private authModel: AuthModel = new AuthModel()

    getOneByID(id: number): Promise<Auth | null> {
        return this.authModel.getOneByID(id)
    }

    getOneByEmail(email: string): Promise<Auth | null> {
        return this.authModel.getOneByEmail(email)
    }

    async update(auth: Auth): Promise<Auth> {
        if (!auth.id) {
            throw new Error('Auth id missing')
        }

        if (!(await this.authModel.getOneByID(auth.id))) {
            throw new Error('Auth dont exist')
        }

        return this.authModel.save(auth)
    }

    create(news: Auth): Promise<Auth> {
        return this.authModel.save(news)
    }

    async canLogin(email: string, pass: string): Promise<number | null> {
        const auth: Auth | null = await this.authModel.getOneByEmail(email)

        if (auth) {
            if (await bcrypt.compare(pass, auth.password)) {
                return auth.userId
            }
        }

        return null
    }

    async getEncryptedPass(pass: string): Promise<string> {
        const saltsRounds: number = 10
        const salt = await bcrypt.genSalt(saltsRounds)

        return bcrypt.hash(pass, salt)
    }
}
