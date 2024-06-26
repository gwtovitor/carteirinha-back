"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserMemory_repo_1 = __importDefault(require("../repo/UserMemory.repo"));
const Signup_1 = __importDefault(require("../use-cases/Signup"));
const Login_1 = __importDefault(require("../use-cases/Login"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Signup', () => {
    beforeAll(() => {
        dotenv.config();
    });
    test('Deve criar um usuario e logar', async () => {
        //given
        const repo = new UserMemory_repo_1.default();
        const input = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1997@',
            name: 'Vitor Augusto',
            validity: new Date(),
            photo: 'https://blabla.com.br',
        };
        //when
        const signin = new Signup_1.default(repo);
        await signin.execute(input);
        //then
        const login = new Login_1.default(repo);
        const loginInput = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1997@',
        };
        const output = await login.execute(loginInput);
        const decoded = jsonwebtoken_1.default.verify(output, process.env.SECRET_KEY);
        expect(decoded.email).toBe(input.email);
        expect(decoded.name).toBe(input.name);
    });
    test('Não deve logar um usuario com password incorreta', async () => {
        //given
        const repo = new UserMemory_repo_1.default();
        const input = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1997@',
            name: 'Vitor Augusto',
            validity: new Date(),
            photo: 'https://blabla.com.br',
        };
        //when
        const signin = new Signup_1.default(repo);
        await signin.execute(input);
        const login = new Login_1.default(repo);
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
        const repo = new UserMemory_repo_1.default();
        const input = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1997@',
            name: 'Vitor Augusto',
            validity: new Date(),
            photo: 'https://blabla.com.br',
        };
        //when
        const signin = new Signup_1.default(repo);
        await signin.execute(input);
        const login = new Login_1.default(repo);
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
