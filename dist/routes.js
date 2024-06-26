"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./api/user.routes"));
class routes {
    router = express_1.default.Router();
    getAllRoutes() {
        console.log('🛣️  Routes');
        this.router.use((0, user_routes_1.default)());
        return this.router;
    }
}
exports.routes = routes;
exports.default = routes;
