"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("src/middleware/auth");
const user_controller_1 = __importDefault(require("./user.controller"));
function routes() {
    const router = express_1.default.Router();
    const controller = new user_controller_1.default();
    router.post(`/signup`, controller.signup);
    router.post(`/login`, controller.login);
    router.put(`/user/update/:id`, auth_1.auth, controller.update);
    router.get(`/user/:id`, auth_1.auth, controller.getUser);
    router.get(`/decode-token`, auth_1.auth, controller.decodeToken);
    return router;
}
exports.default = routes;
