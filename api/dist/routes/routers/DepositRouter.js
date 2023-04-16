"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("@src/controllers");
const Paths_1 = __importDefault(require("../constants/Paths"));
const jet_validator_1 = __importDefault(require("jet-validator/dist/jet-validator"));
const depositRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
depositRouter.get(Paths_1.default.Resell.Deposit.All, controllers_1.DepositController.getAll);
depositRouter.get(Paths_1.default.Resell.Deposit.Get, validate(['id', 'number', 'params']), controllers_1.DepositController.getById);
exports.default = depositRouter;
