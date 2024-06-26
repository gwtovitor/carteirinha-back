"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.set('Content-Type', 'application/json');
        const corsOptions = {
            origin: ['https://carteirinha-front-rirawl8kz-gwtovitors-projects.vercel.app', 'http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        };
        this.app.use((0, cors_1.default)(corsOptions));
        const routes = new routes_1.default();
        this.app.use(routes.getAllRoutes());
    }
}
exports.default = App;
