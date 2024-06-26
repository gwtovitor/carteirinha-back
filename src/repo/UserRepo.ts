import User from "src/domain/User.do"

export default interface UserRepo {
    create(input: User): Promise<void>
    update(user: User): Promise<void>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
}
