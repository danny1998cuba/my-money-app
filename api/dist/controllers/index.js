"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.TransactionController = exports.ExtractionController = exports.DepositController = exports.CurrencyController = void 0;
const CurrencyController_1 = __importDefault(require("./CurrencyController"));
exports.CurrencyController = CurrencyController_1.default;
const DepositController_1 = __importDefault(require("./DepositController"));
exports.DepositController = DepositController_1.default;
const ExtractionController_1 = __importDefault(require("./ExtractionController"));
exports.ExtractionController = ExtractionController_1.default;
const TransactionController_1 = __importDefault(require("./TransactionController"));
exports.TransactionController = TransactionController_1.default;
const UserController_1 = __importDefault(require("./UserController"));
exports.UserController = UserController_1.default;
