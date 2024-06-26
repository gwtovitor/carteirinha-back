import { Request, Response } from 'express';
import Database from '../db/db';
import { CustomRequest, verifyToken } from '../middleware/auth';
import UserRepo from '../repo/UserRepo';
import UserRepoMongo from '../repo/UserRepoMongo';
import Login from '../use-cases/Login';
import Signup from '../use-cases/Signup';
import UpdateUser from '../use-cases/UpdateUser';
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
				throw new Error(
					'You do not have permission to update this user'
				);
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

	public getUser = async (req: CustomRequest, res: Response) => {
		try {
			const user = await this.repo.findById(req.token.id);

			if (!user) {
				throw new Error('User not found');
			}

			return res.status(200).json({
				id: user.getId().get(),
				name: user.name,
				email: user.email,
				validity: user.validity,
				photo: user.photo,
			});
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	};

	public decodeToken = async (req: CustomRequest, res: Response) => {
		try {
			return res.status(200).json({ user: req.token });
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	};
}
