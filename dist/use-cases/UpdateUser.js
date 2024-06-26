"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_do_1 = __importDefault(require("../domain/User.do"));
class UpdateUser {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const found = await this.repo.findByEmail(input.email);
        if (!found) {
            throw new Error('User not found');
        }
        const validity = new Date();
        validity.setFullYear(validity.getFullYear() + 1);
        const userBuildInput = {
            id: input.id,
            email: input.email,
            password: input.password,
            validity: validity,
            photo: input.photo,
            name: input.name
        };
        const user = User_do_1.default.build(userBuildInput);
        await this.repo.update(user);
    }
}
exports.default = UpdateUser;
