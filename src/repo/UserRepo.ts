import User from "src/use-cases/User.do"

export default interface UserRepo {
    create(input: User): Promise<void>
    findByEmail(email: string): Promise<User | undefined>
}
