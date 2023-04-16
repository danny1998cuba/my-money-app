"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
const config = {
    entities: ['./dist/models'],
    entitiesTs: ['./src/models'],
    host: EnvVars_1.default.Database.host,
    port: EnvVars_1.default.Database.port,
    dbName: EnvVars_1.default.Database.name,
    user: EnvVars_1.default.Database.user,
    password: EnvVars_1.default.Database.password,
    type: 'postgresql',
};
exports.default = config;
