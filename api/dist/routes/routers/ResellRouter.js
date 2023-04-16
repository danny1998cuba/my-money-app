"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Paths_1 = __importDefault(require("../constants/Paths"));
const DepositRouter_1 = __importDefault(require("./DepositRouter"));
const ExtractionRouter_1 = __importDefault(require("./ExtractionRouter"));
const TransactionRouter_1 = __importDefault(require("./TransactionRouter"));
const resellRouter = (0, express_1.Router)();
resellRouter.use(Paths_1.default.Resell.Deposit.Base, DepositRouter_1.default);
resellRouter.use(Paths_1.default.Resell.Extraction.Base, ExtractionRouter_1.default);
resellRouter.use(Paths_1.default.Resell.Transaction.Base, TransactionRouter_1.default);
exports.default = resellRouter;
