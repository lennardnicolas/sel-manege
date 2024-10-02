import { dataSource } from '../data-source.js'
import { User } from '../entities/user.js'

export class UserModel {
    getOneByID(id: number): Promise<User | null> {
        const userRepository = dataSource.getRepository(User)
        return userRepository.findOne({ where: { id } })
    }

    save(user: User): Promise<User> {
        const userRepository = dataSource.getRepository(User)
        return userRepository.save(user)
    }
}
