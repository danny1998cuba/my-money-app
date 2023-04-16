"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const EnvVars_1 = __importDefault(require("./constants/EnvVars"));
const dotenv_1 = require("dotenv");
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, dotenv_1.config)();
    const orm = yield core_1.MikroORM.init({
        discovery: {
            warnWhenNoEntities: false,
        },
        host: EnvVars_1.default.Database.host,
        port: EnvVars_1.default.Database.port,
        dbName: EnvVars_1.default.Database.name,
        user: EnvVars_1.default.Database.user,
        password: EnvVars_1.default.Database.password,
        type: 'postgresql',
        entityGenerator: {
            bidirectionalRelations: true,
            identifiedReferences: true,
        },
    });
    const generator = orm.getEntityGenerator();
    yield generator.generate({
        save: true,
        baseDir: process.cwd() + '/src/models',
    });
    yield orm.close(true);
}))();
