import { UserModel } from '../models/user-model.js'
import { User } from '../entities/user.js'

export class UserService {
    private userModel: UserModel = new UserModel()

    getOneByID(id: number): Promise<User | null> {
        return this.userModel.getOneByID(id)
    }

    async update(user: User): Promise<User> {
        if (!user.id) {
            throw new Error('User id missing')
        }

        if (!(await this.userModel.getOneByID(user.id))) {
            throw new Error('User dont exist')
        }

        return this.userModel.save(user)
    }

    create(user: User): Promise<User> {
        return this.userModel.save(user)
    }
}
