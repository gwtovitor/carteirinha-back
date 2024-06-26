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
        // Validação da senha
        if (!this.isValidPassword(plainTextPassword)) {
            console.log(plainTextPassword);
            throw new Error('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e pelo menos 5 caracteres.');
        }
        const hashedPassword = this.hashPassword(plainTextPassword, secretKey);
        return new Password(hashedPassword);
    }
    static build(hashedPassword, secretKey) {
        return new Password(hashedPassword);
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
    static isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    }
}
exports.default = Password;
