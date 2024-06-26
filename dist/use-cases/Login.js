"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Login {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const user = await this.repo.findByEmail(input.email);
        if (!user)
            throw new Error('User not found');
        if (!process.env.SECRET_KEY)
            throw new Error('Invalid secret key');
        const passwordValid = user.password.validate(input.password, process.env.SECRET_KEY);
        if (!passwordValid) {
            throw new Error('Invalid password');
        }
        const output = jsonwebtoken_1.default.sign({
            id: user.id.get(),
            email: user.email,
            name: user.name,
            validity: user.validity,
            photo: user.photo,
        }, process.env.SECRET_KEY, { expiresIn: '2days' });
        return output;
    }
}
exports.default = Login;
