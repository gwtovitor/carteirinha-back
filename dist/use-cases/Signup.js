"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_do_1 = __importDefault(require("../domain/User.do"));
class Signup {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const validity = new Date();
        validity.setFullYear(validity.getFullYear() + 1);
        input.validity = validity;
        const user = User_do_1.default.create(input);
        const found = await this.repo.findByEmail(user.getEmail());
        if (found != undefined) {
            throw new Error('A user with this email address already exists');
        }
        await this.repo.create(user);
        return;
    }
}
exports.default = Signup;
