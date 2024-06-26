"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Token not found');
        }
        const SECRET_KEY = process.env.SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.token = decoded; // Tipo assertion para informar ao TypeScript sobre a existência de 'token'
        next();
    }
    catch (err) {
        const errorMessage = 'Please authenticate';
        console.error(errorMessage);
        res.status(401).send(errorMessage);
    }
};
exports.auth = auth;
const verifyToken = (token) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (err) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
