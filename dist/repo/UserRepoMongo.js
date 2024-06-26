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
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../db/db"));
const User_do_1 = __importDefault(require("../domain/User.do"));
const mongoose_1 = __importDefault(require("mongoose"));
let UserRepoMongo = class UserRepoMongo {
    database;
    userModel;
    constructor(database) {
        this.database = database;
        const userSchema = new mongoose_1.default.Schema({
            id: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            password: { type: String, required: true },
            validity: { type: Date, required: true },
            photo: { type: String },
        });
        this.userModel = mongoose_1.default.model('users', userSchema, 'carteirinha');
    }
    async create(user) {
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
    async update(user) {
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
        }
        else {
            throw new Error(`User not found`);
        }
    }
    async findByEmail(email) {
        const userDoc = await this.userModel.findOne({ email }).exec();
        if (userDoc) {
            return User_do_1.default.build({
                id: userDoc.id,
                email: userDoc.email,
                name: userDoc.name,
                password: userDoc.password,
                validity: userDoc.validity,
                photo: userDoc.photo,
            });
        }
        else {
            return undefined;
        }
    }
    async findById(id) {
        const userDoc = await this.userModel.findOne({ id }).exec();
        if (userDoc) {
            return User_do_1.default.build({
                id: userDoc.id,
                email: userDoc.email,
                name: userDoc.name,
                password: userDoc.password,
                validity: userDoc.validity,
                photo: userDoc.photo,
            });
        }
        else {
            return undefined;
        }
    }
};
UserRepoMongo = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [db_1.default])
], UserRepoMongo);
exports.default = UserRepoMongo;
