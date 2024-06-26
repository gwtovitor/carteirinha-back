"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("src/db/db"));
const UserRepoMongo_1 = __importDefault(require("src/repo/UserRepoMongo"));
const Login_1 = __importDefault(require("src/use-cases/Login"));
const Signup_1 = __importDefault(require("src/use-cases/Signup"));
const UpdateUser_1 = __importDefault(require("src/use-cases/UpdateUser"));
const typedi_1 = require("typedi");
let UserController = class UserController {
    repo;
    constructor() {
        this.repo = new UserRepoMongo_1.default(new db_1.default());
    }
    signup = async (req, res) => {
        try {
            const input = req.body;
            const signup = new Signup_1.default(this.repo);
            await signup.execute({
                email: input.email,
                name: input.name,
                password: input.password,
                validity: new Date(),
                photo: input.photo,
            });
            return res.status(200).send();
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    login = async (req, res) => {
        try {
            const input = req.body;
            const login = new Login_1.default(this.repo);
            const token = await login.execute({
                email: input.email,
                password: input.password,
            });
            return res.status(200).json({ token: token });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const input = req.body;
            const update = new UpdateUser_1.default(this.repo);
            const user = await this.repo.findById(req.token.id);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.email != req.body.email) {
                throw new Error('You do not have permission to update this user');
            }
            await update.execute({
                id: user.id.get(),
                email: input.email,
                name: input.name,
                password: user.password.get(),
                photo: input.photo,
            });
            return res.status(200).send();
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    getUser = async (req, res) => {
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
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    decodeToken = async (req, res) => {
        try {
            return res.status(200).json({ user: req.token });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
};
UserController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UserController);
exports.default = UserController;
