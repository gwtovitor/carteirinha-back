import UserRepoMemory from '../repo/UserMemory.repo';
import Signup from './Signup';
import UserRepo from '../repo/UserMemory.repo';
import Login from './Login';
import User from './User.do';
import UpdateUser from './UpdateUser';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

describe('Update', () => {
	beforeAll(() => {
		dotenv.config();
	});
	test('Deve atualizar um usuário', async () => {
		//given
		const repo: UserRepo = new UserRepoMemory();

		const inputSignin = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1997@',
			name: 'Vitor Augusto',
			validity: new Date(),
			photo: 'https://blabla.com.br',
		};

		//when
		const signin = new Signup(repo);
		await signin.execute(inputSignin);
		const outputSignin = await repo.findByEmail(inputSignin.email);

		if (!outputSignin) throw new Error('');

		const inputUpdate = {
			id: outputSignin.getId().get(),
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1991@',
			name: 'Vitor AAAA',
			validity: inputSignin.validity,
			photo: 'https://blabla.com.br',
		};

		const update = new UpdateUser(repo);
		await update.execute(inputUpdate);

		//then
		const login = new Login(repo);
		const loginInput = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1991@',
		};
		const output = await login.execute(loginInput);
        const decoded = jwt.verify(output, process.env.SECRET_KEY  as string) as jwtOutput

		expect(typeof output == "string").toBe(true);
		expect(decoded.name).toBe(inputUpdate.name);
	});
});

export type jwtOutput = {
    id: string;
    email: string;
    name: string;
    validity: Date, 
    photo: string
}