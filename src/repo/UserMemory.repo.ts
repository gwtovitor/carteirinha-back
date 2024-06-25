import UserRepo from './UserRepo';
import User from 'src/use-cases/User.do';

export default class UserRepoMemory implements UserRepo {
	private users: User[];

	constructor() {
		this.users = [];
	}
	findById(id: string): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
	update(user: User): Promise<void> {

		return new Promise<void>((resolve, reject) => {
			const index = this.users.findIndex((u) => {
				return u.id.get() === user.id.get();
			});
			if (index !== -1) {
				this.users[index] = user;
				return resolve();
			}
			reject(new Error(`User not found`));
		});
	}

	create(user: User): Promise<void> {
		return new Promise<void>((resolve) => {
			this.users.push(user);
			resolve();
		});
	}

	findByEmail(email: string): Promise<User | undefined> {
		return new Promise<User | undefined>((resolve) => {
			const found = this.users.find((item) => item.getEmail() == email);
			resolve(found);
		});
	}
}
