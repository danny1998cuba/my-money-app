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
exports.CURRENCY_NOT_FOUND_ERR = void 0;
const core_1 = require("@mikro-orm/core");
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const server_1 = require("@src/server");
exports.CURRENCY_NOT_FOUND_ERR = 'Currency not found';
function getAll() {
    const repo = server_1.DI.currencyRepository;
    return repo === null || repo === void 0 ? void 0 : repo.findAll();
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.currencyRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            return founded;
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CURRENCY_NOT_FOUND_ERR);
        }
    });
}
function addOne(curr) {
    const repo = server_1.DI.currencyRepository;
    const entity = repo === null || repo === void 0 ? void 0 : repo.create(curr);
    return repo === null || repo === void 0 ? void 0 : repo.persistAndFlush(entity);
}
function updateOne(curr) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.currencyRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: curr.id }));
            (0, core_1.wrap)(founded).assign(curr);
            return repo === null || repo === void 0 ? void 0 : repo.flush();
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CURRENCY_NOT_FOUND_ERR);
        }
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.currencyRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            if (founded)
                return repo === null || repo === void 0 ? void 0 : repo.removeAndFlush(founded);
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CURRENCY_NOT_FOUND_ERR);
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
