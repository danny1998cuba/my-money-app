"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("@src/controllers");
const Paths_1 = __importDefault(require("../constants/Paths"));
const jet_validator_1 = __importDefault(require("jet-validator/dist/jet-validator"));
const User_1 = __importDefault(require("@src/models/User"));
const userRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
userRouter.get(Paths_1.default.Users.All, controllers_1.UserController.getAll);
userRouter.post(Paths_1.default.Users.Add, validate(['user', User_1.default.isUser]), controllers_1.UserController.add);
userRouter.put(Paths_1.default.Users.Update, validate(['user', User_1.default.isUser]), controllers_1.UserController.update);
userRouter.delete(Paths_1.default.Users.Delete, validate(['id', 'number', 'params']), controllers_1.UserController.delete);
exports.default = userRouter;
