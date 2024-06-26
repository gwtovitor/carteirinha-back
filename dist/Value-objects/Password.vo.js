"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Password {
    hashedPassword;
    constructor(hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    static create(plainTextPassword, secretKey) {
        const hashedPassword = this.hashPassword(plainTextPassword, secretKey);
        return new Password(hashedPassword);
    }
    static build(plainTextPassword, secretKey) {
        return new Password(plainTextPassword);
    }
    static hashPassword(plainTextPassword, secretKey) {
        const hash = crypto_1.default.createHmac('sha256', secretKey);
        hash.update(plainTextPassword);
        return hash.digest('hex');
    }
    validate(plainTextPassword, secretKey) {
        const hashedInputPassword = Password.hashPassword(plainTextPassword, secretKey);
        return this.hashedPassword === hashedInputPassword;
    }
    get() {
        return this.hashedPassword;
    }
}
exports.default = Password;
