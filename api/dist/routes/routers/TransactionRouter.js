"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("@src/controllers");
const Paths_1 = __importDefault(require("../constants/Paths"));
const jet_validator_1 = __importDefault(require("jet-validator/dist/jet-validator"));
const models_1 = require("@src/models");
const transactionRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
transactionRouter.get(Paths_1.default.Resell.Transaction.All, controllers_1.TransactionController.getAll);
transactionRouter.get(Paths_1.default.Resell.Transaction.Get, validate(['id', 'number', 'params']), controllers_1.TransactionController.getById);
transactionRouter.post(Paths_1.default.Resell.Transaction.Add, validate(['transaction', models_1.DboResellTransaction.isEntity]), controllers_1.TransactionController.add);
transactionRouter.put(Paths_1.default.Resell.Transaction.Update, validate(['transaction', models_1.DboResellTransaction.isEntity]), controllers_1.TransactionController.update);
transactionRouter.delete(Paths_1.default.Resell.Transaction.Delete, validate(['id', 'number', 'params']), controllers_1.TransactionController.delete);
exports.default = transactionRouter;
