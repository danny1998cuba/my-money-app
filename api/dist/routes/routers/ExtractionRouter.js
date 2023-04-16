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
const extractionRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
extractionRouter.get(Paths_1.default.Resell.Extraction.All, controllers_1.ExtractionController.getAll);
extractionRouter.get(Paths_1.default.Resell.Extraction.Get, validate(['id', 'number', 'params']), controllers_1.ExtractionController.getById);
extractionRouter.post(Paths_1.default.Resell.Transaction.Add, validate(['extraction', models_1.DboResellExtraction.isEntity]), controllers_1.ExtractionController.add);
extractionRouter.put(Paths_1.default.Resell.Transaction.Update, validate(['extraction', models_1.DboResellExtraction.isEntity]), controllers_1.ExtractionController.update);
extractionRouter.delete(Paths_1.default.Resell.Transaction.Delete, validate(['id', 'number', 'params']), controllers_1.ExtractionController.delete);
exports.default = extractionRouter;
