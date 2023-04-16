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
exports.TRANSACTION_NOT_FOUND_ERR = void 0;
const core_1 = require("@mikro-orm/core");
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const server_1 = require("@src/server");
exports.TRANSACTION_NOT_FOUND_ERR = 'Transaction not found';
function getAll() {
    const repo = server_1.DI.transactionRepository;
    return repo === null || repo === void 0 ? void 0 : repo.findAll();
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.transactionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            return founded;
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.TRANSACTION_NOT_FOUND_ERR);
        }
    });
}
function addOne(transaction) {
    const repo = server_1.DI.transactionRepository;
    const entity = repo === null || repo === void 0 ? void 0 : repo.create(transaction);
    if ((entity === null || entity === void 0 ? void 0 : entity.deposits.getItems().length) == 0) {
        throw new classes_1.RouteError(HttpStatusCodes_1.default.BAD_REQUEST, 'Deposits are required');
    }
    let total_amount = 0, total_cost = 0;
    entity === null || entity === void 0 ? void 0 : entity.deposits.getItems().forEach(dep => {
        total_amount += dep.dAmount;
        total_cost += dep.dCost;
    });
    if (total_amount != transaction.tAmount
        || total_cost != transaction.tSpent) {
        throw new classes_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'Incoherence on deposits data');
    }
    return repo === null || repo === void 0 ? void 0 : repo.persistAndFlush(entity);
}
function updateOne(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.transactionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: transaction.id }));
            (0, core_1.wrap)(founded).assign(transaction);
            return repo === null || repo === void 0 ? void 0 : repo.flush();
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.TRANSACTION_NOT_FOUND_ERR);
        }
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.transactionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            if (founded)
                return repo === null || repo === void 0 ? void 0 : repo.removeAndFlush(founded);
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.TRANSACTION_NOT_FOUND_ERR);
        }
    });
}
exports.default = {
    getAll,
    getById,
    addOne,
    updateOne,
    delete: _delete,
};
