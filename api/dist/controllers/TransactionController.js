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
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const classes_1 = require("@src/other/classes");
const services_1 = require("@src/services");
function getAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactions = yield services_1.TransactionService.getAll();
        return res.status(HttpStatusCodes_1.default.OK).json({ transactions });
    });
}
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const transaction = yield services_1.TransactionService.getById(id);
            return res.status(HttpStatusCodes_1.default.OK).json({ transaction });
        }
        catch (error) {
            if (error instanceof classes_1.RouteError)
                return res.status(error.status).json({ message: error.message });
            else
                return res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).end();
        }
    });
}
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { transaction } = req.body;
            yield services_1.TransactionService.addOne(transaction);
            return res.status(HttpStatusCodes_1.default.CREATED).end();
        }
        catch (error) {
            if (error instanceof classes_1.RouteError)
                return res.status(error.status).json({ message: error.message });
            if (error instanceof core_1.UniqueConstraintViolationException)
                return res.status(HttpStatusCodes_1.default.CONFLICT).json({ message: 'The currency identifier must be unique.' });
            else
                return res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).end();
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { transaction } = req.body;
            yield services_1.TransactionService.updateOne(transaction);
            return res.status(HttpStatusCodes_1.default.OK).end();
        }
        catch (error) {
            if (error instanceof classes_1.RouteError)
                return res.status(error.status).json({ message: error.message });
            else if (error instanceof core_1.UniqueConstraintViolationException)
                return res.status(HttpStatusCodes_1.default.CONFLICT).json({ message: 'The currency identifier must be unique.' });
            else
                return res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).end();
        }
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            yield services_1.TransactionService.delete(id);
            return res.status(HttpStatusCodes_1.default.OK).end();
        }
        catch (error) {
            if (error instanceof classes_1.RouteError)
                return res.status(error.status).json({ message: error.message });
            else
                return res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).end();
        }
    });
}
exports.default = {
    getAll,
    getById,
    add,
    update,
    delete: delete_,
};
