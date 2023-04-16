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
const currRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
currRouter.get(Paths_1.default.Currency.All, controllers_1.CurrencyController.getAll);
currRouter.get(Paths_1.default.Currency.Get, validate(['id', 'number', 'params']), controllers_1.CurrencyController.getById);
currRouter.post(Paths_1.default.Currency.Add, validate(['curr', models_1.DboCommonsCurrency.isEntity]), controllers_1.CurrencyController.add);
currRouter.put(Paths_1.default.Currency.Update, validate(['curr', models_1.DboCommonsCurrency.isEntity]), controllers_1.CurrencyController.update);
currRouter.delete(Paths_1.default.Currency.Delete, validate(['id', 'number', 'params']), controllers_1.CurrencyController.delete);
exports.default = currRouter;
