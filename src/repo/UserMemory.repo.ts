import UserRepo from "./UserRepo"
import User from "src/use-cases/User.do"

export default class UserRepoMemory implements UserRepo {
    private users: User[]

    constructor() {
        this.users = []
    }

    create(user: User): Promise<void> {
        return new Promise<void>((resolve) => {
            this.users.push(user)
            resolve()
        })
    }

    findByEmail(email: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve) => {
            const found = this.users.find((item) => item.getEmail() == email)
            resolve(found)
        })
    }
}
