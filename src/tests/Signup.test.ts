import UserRepoMemory from '../repo/UserMemory.repo';
import Signup from '../use-cases/Signup';
import UserRepo from '../repo/UserMemory.repo';
import Login from '../use-cases/Login';
import * as dotenv from 'dotenv'
import { jwtOutput } from '../tests/UpdateUser.test';
import jwt from 'jsonwebtoken';

describe('Signup', () => {
    
    beforeAll(()=>{
        dotenv.config()
    })
    test('Deve criar um usuario e logar', async () => {
		
        //given
        const repo: UserRepo = new UserRepoMemory();
		const input = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1997@',
			name: 'Vitor Augusto',
			validity: new Date(),
			photo: 'https://blabla.com.br',
		};
		
        //when
		const signin = new Signup(repo);
		await signin.execute(input);

		//then
		const login = new Login(repo);
		const loginInput = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1997@',
		};
    
		const output = await login.execute(loginInput)
        const decoded = jwt.verify(output, process.env.SECRET_KEY  as string) as jwtOutput
		expect(decoded.email).toBe(input.email);
		expect(decoded.name).toBe(input.name);
	});
	test('Não deve logar um usuario com password incorreta', async () => {
		
        //given
		const repo: UserRepo = new UserRepoMemory();
		const input = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1997@',
			name: 'Vitor Augusto',
			validity: new Date(),
			photo: 'https://blabla.com.br',
		};
		
        //when
		const signin = new Signup(repo);
		await signin.execute(input);
        
        const login = new Login(repo);
		const loginInput = {
			email: 'gwtovitorpw@gmail.com',
			password: '123',
		};
        
		//then
		await expect(async () => {
			await login.execute(loginInput);
		}).rejects.toThrow('Invalid password');
	});

	test('Não deve logar (Email inexistente)', async () => {
		
        //given
		const repo: UserRepo = new UserRepoMemory();
		const input = {
			email: 'gwtovitorpw@gmail.com',
			password: 'Vitor1997@',
			name: 'Vitor Augusto',
			validity: new Date(),
			photo: 'https://blabla.com.br',
		};
		
        //when
		const signin = new Signup(repo);
		await signin.execute(input);
        
        const login = new Login(repo);
		const loginInput = {
			email: 'vitor@gmail.com',
			password: '123',
		};

		//then
		await expect(async () => {
			await login.execute(loginInput);
		}).rejects.toThrow('User not found');
	});
});
