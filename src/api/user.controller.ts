import { Request, Response } from 'express';
import Database from 'src/db/db';
import { CustomRequest } from 'src/middleware/auth';
import UserRepo from 'src/repo/UserRepo';
import UserRepoMongo from 'src/repo/UserRepoMongo';
import Login from 'src/use-cases/Login';
import Signup from 'src/use-cases/Signup';
import UpdateUser from 'src/use-cases/UpdateUser';
import { Service } from 'typedi';

@Service()
export default class UserController {
	private repo: UserRepo;
	constructor() {
		this.repo = new UserRepoMongo(new Database());
	}

	public signup = async (req: Request, res: Response) => {
		try {
			const input = req.body;
			const signup = new Signup(this.repo);
			await signup.execute({
				email: input.email,
				name: input.name,
				password: input.password,
				validity: new Date(),
				photo: input.photo,
			});
			return res.status(200).send();
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	};

	public login = async (req: Request, res: Response) => {
		try {
			const input = req.body;
			const login = new Login(this.repo);
			const token = await login.execute({
				email: input.email,
				password: input.password,
			});
			return res.status(200).json({ token: token });
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	};

	public update = async (req: CustomRequest, res: Response) => {
		try {
			const input = req.body;
			const update = new UpdateUser(this.repo);

			const user = await this.repo.findById(req.token.id);
			
			if (!user) {
				throw new Error('User not found');
			}
			if (user.email != req.body.email) {
				throw new Error('You do not have permission to update this user');
			}

			await update.execute({
				id: user.id.get(),
				email: input.email,
				name: input.name,
				password: user.password.get(),
				photo: input.photo,
			});

			return res.status(200).send();
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}; 
}

