
import UserRepo from "src/repo/UserRepo"
import User from "./User.do"

export default class Login {
    private repo: UserRepo

    constructor(repo: UserRepo) {
        this.repo = repo
    }

    async execute(input: input) {
        const found = await this.repo.findByEmail(input.email)
        if (!found) {
            throw new Error('User not found');
        }

        const userObj = {
            id: found.id.get(), 
			email: found.email,
			name: found.name,
            password: found.password.get(),
			validity: new Date()
        }

        const output = User.build(userObj)
        return output
    }
}

type input = {
        email: string,
        password: string,
}
