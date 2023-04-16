"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Paths_1 = __importDefault(require("./constants/Paths"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const CurrencyRouter_1 = __importDefault(require("./routers/CurrencyRouter"));
const ResellRouter_1 = __importDefault(require("./routers/ResellRouter"));
const apiRouter = (0, express_1.Router)();
apiRouter.use(Paths_1.default.Users.Base, UserRouter_1.default);
apiRouter.use(Paths_1.default.Currency.Base, CurrencyRouter_1.default);
apiRouter.use(Paths_1.default.Resell.Base, ResellRouter_1.default);
exports.default = apiRouter;
