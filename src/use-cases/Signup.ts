
import UserRepo from "src/repo/UserRepo"
import User from "./User.do"

export default class Signup {
    private repo: UserRepo

    constructor(repo: UserRepo) {
        this.repo = repo
    }

    async execute(input: input) {
        const user = User.create(input)

        const found = await this.repo.findByEmail(user.getEmail())
        if (found != undefined) {
            throw new Error('A user with this email address already exists')
        }

        await this.repo.create(user)
    }
}

type input = {
        email: string,
        name: string,
        password: string,
        validity: Date
}
