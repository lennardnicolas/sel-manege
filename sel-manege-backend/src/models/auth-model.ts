import { dataSource } from '../data-source.js'
import { Auth } from '../entities/auth.js'

export class AuthModel {
    getOneByID(id: number): Promise<Auth | null> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.findOne({ where: { id } })
    }

    getOneByEmail(email: string): Promise<Auth | null> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.findOne({ where: { email } })
    }

    save(auth: Auth): Promise<Auth> {
        const authRepository = dataSource.getRepository(Auth)
        return authRepository.save(auth)
    }
}
