import { dataSource } from '../data-source.js'
import { User } from '../entities/user.js'

export class UserModel {
    async getOneByID(id: number): Promise<User | null> {
        const userRepository = dataSource.getRepository(User)
        return await userRepository.findOne({ where: { id } })
    }

    async save(user: User): Promise<User> {
        const userRepository = dataSource.getRepository(User)
        return await userRepository.save(user)
    }
}
