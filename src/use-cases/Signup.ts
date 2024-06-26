import UserRepo from '../repo/UserRepo';
import User from '../domain/User.do';

export default class Signup {
	private repo: UserRepo;

	constructor(repo: UserRepo) {
		this.repo = repo;
	}

	async execute(input: input) {

		const validity = new Date();
		validity.setFullYear(validity.getFullYear() + 1);
		input.validity = validity

		const user = User.create(input);
	
		const found = await this.repo.findByEmail(user.getEmail());
		if (found != undefined) {
			throw new Error('A user with this email address already exists');
		}
		await this.repo.create(user);
		return;
	}
}

type input = {
	email: string;
	name: string;
	password: string;
	validity: Date;
	photo: string;
};
