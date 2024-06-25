import UserRepo from 'src/repo/UserRepo';
import User from './User.do';
import Password from './Password.vo';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class Login {
	private repo: UserRepo;

	constructor(repo: UserRepo) {
		this.repo = repo;
	}

	async execute(input: input): Promise<string> {
		const user = await this.repo.findByEmail(input.email);
		if (!user) throw new Error('User not found');
		if (!process.env.SECRET_KEY) throw new Error('Invalid secret key');

		const passwordValid = user.password.validate(
			input.password,
			process.env.SECRET_KEY
		);
		if (!passwordValid) {
			throw new Error('Invalid password');
		}
		const output = jwt.sign(
			{
				id: user.id.get(),
				email: user.email,
				name: user.name,
				validity: user.validity,
				photo: user.photo,
			},
			process.env.SECRET_KEY as string,
			{ expiresIn: '2days' }
		);

		return output;
	}
}

type input = {
	email: string;
	password: string;
};
