import { UserModel } from '../models/user-model.js'
import { User } from '../entities/user.js'

export class UserService {
    private userModel: UserModel = new UserModel()

    async getOneByID(id: number): Promise<User | null> {
        return this.userModel.getOneByID(id)
    }

    async update(user: User): Promise<User> {
        return this.userModel.save(user)
    }

    async create(user: User): Promise<User> {
        return this.userModel.save(user)
    }
}
