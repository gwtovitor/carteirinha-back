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
const UpdateUser_1 = __importDefault(require("../use-cases/UpdateUser"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Update', () => {
    beforeAll(() => {
        dotenv.config();
    });
    test('Deve atualizar um usuário', async () => {
        //given
        const repo = new UserMemory_repo_1.default();
        const inputSignin = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1997@',
            name: 'Vitor Augusto',
            validity: new Date(),
            photo: 'https://blabla.com.br',
        };
        //when
        const signin = new Signup_1.default(repo);
        await signin.execute(inputSignin);
        const outputSignin = await repo.findByEmail(inputSignin.email);
        if (!outputSignin)
            throw new Error('');
        const inputUpdate = {
            id: outputSignin.getId().get(),
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1991@',
            name: 'Vitor AAAA',
            validity: inputSignin.validity,
            photo: 'https://blabla.com.br',
        };
        const update = new UpdateUser_1.default(repo);
        await update.execute(inputUpdate);
        //then
        const login = new Login_1.default(repo);
        const loginInput = {
            email: 'gwtovitorpw@gmail.com',
            password: 'Vitor1991@',
        };
        const output = await login.execute(loginInput);
        const decoded = jsonwebtoken_1.default.verify(output, process.env.SECRET_KEY);
        expect(typeof output == "string").toBe(true);
        expect(decoded.name).toBe(inputUpdate.name);
    });
});
