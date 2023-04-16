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
exports.DI = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
require("express-async-errors");
const api_1 = __importDefault(require("@src/routes/api"));
const Paths_1 = __importDefault(require("@src/routes/constants/Paths"));
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const misc_1 = require("@src/constants/misc");
const classes_1 = require("@src/other/classes");
const mikro_orm_connection_1 = require("./mikro-orm-connection");
const core_1 = require("@mikro-orm/core");
exports.DI = {};
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
    if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Dev) {
        app.use((0, morgan_1.default)('dev'));
    }
    if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Production) {
        app.use((0, helmet_1.default)());
    }
    yield (0, mikro_orm_connection_1.connection)(exports.DI);
    app.use((req, res, next) => {
        if (exports.DI.em)
            core_1.RequestContext.create(exports.DI.em, next);
    });
    app.use(Paths_1.default.Base, api_1.default);
    app.use((err, _, res, next) => {
        if (EnvVars_1.default.NodeEnv !== misc_1.NodeEnvs.Test) {
            jet_logger_1.default.err(err, true);
        }
        let status = HttpStatusCodes_1.default.BAD_REQUEST;
        if (err instanceof classes_1.RouteError) {
            status = err.status;
        }
        return res.status(status).json({ error: err.message });
    });
    const viewsDir = path_1.default.join(__dirname, 'views');
    app.set('views', viewsDir);
    const staticDir = path_1.default.join(__dirname, 'public');
    app.use(express_1.default.static(staticDir));
    app.get('/', (_, res) => {
        return res.redirect('/users');
    });
    app.get('/users', (_, res) => {
        return res.sendFile('users.html', { root: viewsDir });
    });
    return app;
});
exports.default = bootstrap;
