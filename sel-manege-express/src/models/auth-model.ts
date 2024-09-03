import { dataSource } from '../data-source.js'
import { Auth } from '../entities/auth.js'

export class AuthModel {
    async getOneByID(id: number): Promise<Auth | null> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.findOne({ where: { id } })
    }

    async getOneByEmail(email: string): Promise<Auth | null> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.findOne({ where: { email } })
    }

    async save(auth: Auth): Promise<Auth> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.save(auth)
    }
}
