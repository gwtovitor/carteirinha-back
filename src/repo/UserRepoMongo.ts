import { Service } from 'typedi';
import UserRepo from './UserRepo';
import Database from '../db/db';
import User from '../domain/User.do';
import mongoose from 'mongoose';

@Service()
export default class UserRepoMongo implements UserRepo {
	private userModel: mongoose.Model<any>;

	constructor(private database: Database) {
		const userSchema = new mongoose.Schema({
			id: { type: String, required: true, unique: true },
			email: { type: String, required: true, unique: true },
			name: { type: String, required: true },
			password: { type: String, required: true },
			validity: { type: Date, required: true },
			photo: { type: String },
		});

		this.userModel = mongoose.model('users', userSchema, 'carteirinha');
	}

	async create(user: User): Promise<void> {
		const userDoc = new this.userModel({
			id: user.id.get(),
			email: user.email,
			name: user.name,
			password: user.password.get(),
			validity: user.validity,
			photo: user.photo,
		});
		await userDoc.save();
	}

	async update(user: User): Promise<void> {
		const userDoc = await this.userModel
			.findOne({ id: user.id.get() })
			.exec();
		console.log(userDoc.photo);
		console.log(user.photo);
		if (userDoc) {
			userDoc.email = user.email;
			userDoc.name = user.name;
			userDoc.password = user.password.get();
			userDoc.photo = user.photo;
			userDoc.validity = user.validity;

			await userDoc.save();
		} else {
			throw new Error(`User not found`);
		}
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const userDoc = await this.userModel.findOne({ email }).exec();
		if (userDoc) {
			return User.build({
				id: userDoc.id,
				email: userDoc.email,
				name: userDoc.name,
				password: userDoc.password,
				validity: userDoc.validity,
				photo: userDoc.photo,
			});
		} else {
			return undefined;
		}
	}

	async findById(id: string): Promise<User | undefined> {
		const userDoc = await this.userModel.findOne({ id }).exec();
		if (userDoc) {
			return User.build({
				id: userDoc.id,
				email: userDoc.email,
				name: userDoc.name,
				password: userDoc.password,
				validity: userDoc.validity,
				photo: userDoc.photo,
			});
		} else {
			return undefined;
		}
	}
}
