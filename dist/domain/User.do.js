"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_vo_1 = __importDefault(require("../Value-objects/UUID.vo"));
const Password_vo_1 = __importDefault(require("../Value-objects/Password.vo"));
class User {
    id;
    email;
    name;
    password;
    validity;
    photo;
    constructor(id, email, name, password, validity, photo) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.validity = validity;
        this.photo = photo;
    }
    static create(input) {
        if (!process.env.SECRET_KEY) {
            throw new Error("Undefined secret key");
        }
        return new User(UUID_vo_1.default.create(), input.email, input.name, Password_vo_1.default.create(input.password, process.env.SECRET_KEY), new Date(), input.photo);
    }
    static build(input) {
        if (!process.env.SECRET_KEY) {
            throw new Error("Undefined secret key");
        }
        return new User(UUID_vo_1.default.build(input.id), input.email, input.name, Password_vo_1.default.build(input.password, process.env.SECRET_KEY), new Date(input.validity), input.photo);
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = User;
