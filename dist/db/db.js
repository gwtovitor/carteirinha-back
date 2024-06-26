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
//using mongo
const mongoose_1 = __importDefault(require("mongoose"));
const typedi_1 = require("typedi");
let Database = class Database {
    constructor() {
        mongoose_1.default.Promise = Promise;
        mongoose_1.default.connection.on('connected', () => {
            console.log('🟢 MongoDB - Connection Established');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.log('🟢 MongoDB - Connection Reestablished');
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('🔴 MongoDB - Connection Disconnected');
        });
        mongoose_1.default.connection.on('close', () => {
            console.log('🔴 MongoDB - Connection Closed');
        });
        mongoose_1.default.connection.on('error', (error) => {
            console.log('🔴 MongoDB - ERROR: ' + error);
        });
        this.connect();
    }
    on(eventName, callback) {
        mongoose_1.default.connection.on(eventName, () => callback());
    }
    async connect() {
        const run = async () => {
            await mongoose_1.default.connect("mongodb+srv://admin:FbnktXjNDDkJ7jiV@atlasdb.wx0smvj.mongodb.net/?appName=atlasdb");
        };
        run().catch((error) => console.error(error, 'Error na conexção', "mongodb+srv://admin:FbnktXjNDDkJ7jiV@atlasdb.wx0smvj.mongodb.net/?appName=atlasdb"));
    }
    get() {
        return mongoose_1.default;
    }
    repo(schema, name) {
        const repoSchema = new mongoose_1.default.Schema(schema);
        return mongoose_1.default.model(name, repoSchema);
    }
};
Database = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], Database);
exports.default = Database;
