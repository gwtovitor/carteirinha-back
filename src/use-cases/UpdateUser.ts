import UserRepo from 'src/repo/UserRepo';
import User from '../domain/User.do';

export default class UpdateUser {
	private repo: UserRepo;

	constructor(repo: UserRepo) {
		this.repo = repo;
	}

	async execute(input: input) {
		const found = await this.repo.findByEmail(input.email);
		if (!found) {
			throw new Error('User not found');
		}

        const validity = new Date();
		validity.setFullYear(validity.getFullYear() + 1);

        const userBuildInput = {
            id: input.id,
            email: input.email,
            password: input.password,
            validity: validity,
            photo: input.photo,
            name: input.name
        };
        const user = User.build(userBuildInput)
		await this.repo.update(user);
	}
}

type input = {
    id: string
    email: string,
    name: string,
    password: string,
    photo: string
}