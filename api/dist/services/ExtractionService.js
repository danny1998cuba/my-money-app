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
exports.EXTRACTION_NOT_FOUND_ERR = void 0;
const core_1 = require("@mikro-orm/core");
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const server_1 = require("@src/server");
const models_1 = require("@src/models");
exports.EXTRACTION_NOT_FOUND_ERR = 'Extraction not found';
const AMOUNT_ERRORS = {
    E_GT_T: 'The extraction amount must be less than the transaction amount',
    Es_GT_T: 'The amount is bigger than the remaining capacity',
};
function getAll() {
    const repo = server_1.DI.extractionRepository;
    return repo === null || repo === void 0 ? void 0 : repo.findAll();
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.extractionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            return founded;
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.EXTRACTION_NOT_FOUND_ERR);
        }
    });
}
function getByTransactionId(transaction_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.extractionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.find({ t: (_a = server_1.DI.transactionRepository) === null || _a === void 0 ? void 0 : _a.getReference(transaction_id) }));
            return founded;
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.EXTRACTION_NOT_FOUND_ERR);
        }
    });
}
function addOne(extraction) {
    return __awaiter(this, void 0, void 0, function* () {
        const em = server_1.DI.em;
        em === null || em === void 0 ? void 0 : em.begin();
        const entity = em === null || em === void 0 ? void 0 : em.create(models_1.DboResellExtraction, extraction);
        try {
            yield checkAmount(entity);
            entity === null || entity === void 0 ? void 0 : entity.validate();
            em === null || em === void 0 ? void 0 : em.persistAndFlush(entity);
            em === null || em === void 0 ? void 0 : em.commit();
        }
        catch (error) {
            em === null || em === void 0 ? void 0 : em.rollback();
            throw error;
        }
    });
}
function updateOne(extraction) {
    return __awaiter(this, void 0, void 0, function* () {
        const em = server_1.DI.em;
        em === null || em === void 0 ? void 0 : em.begin();
        try {
            const founded = yield (em === null || em === void 0 ? void 0 : em.findOneOrFail(models_1.DboResellExtraction, { id: extraction.id }));
            const modified = (0, core_1.wrap)(founded).assign(extraction);
            yield checkAmount(modified);
            modified === null || modified === void 0 ? void 0 : modified.validate();
            em === null || em === void 0 ? void 0 : em.flush();
            em === null || em === void 0 ? void 0 : em.commit();
        }
        catch (error) {
            if (error instanceof classes_1.RouteError) {
                em === null || em === void 0 ? void 0 : em.rollback();
                throw error;
            }
            else
                throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.EXTRACTION_NOT_FOUND_ERR);
        }
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = server_1.DI.extractionRepository;
        try {
            const founded = yield (repo === null || repo === void 0 ? void 0 : repo.findOneOrFail({ id: id }));
            if (founded)
                return repo === null || repo === void 0 ? void 0 : repo.removeAndFlush(founded);
        }
        catch (error) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.EXTRACTION_NOT_FOUND_ERR);
        }
    });
}
function checkAmount(extraction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield ((_a = server_1.DI.transactionRepository) === null || _a === void 0 ? void 0 : _a.findOne({ id: extraction === null || extraction === void 0 ? void 0 : extraction.t.id }));
        let totalAmount = 0;
        if (transaction === null || transaction === void 0 ? void 0 : transaction.id)
            totalAmount = yield totalAmountByTransaction(transaction.id);
        if ((extraction === null || extraction === void 0 ? void 0 : extraction.eAmount) && (transaction === null || transaction === void 0 ? void 0 : transaction.tAmount)) {
            if (extraction.eAmount > transaction.tAmount)
                throw new classes_1.RouteError(HttpStatusCodes_1.default.CONFLICT, AMOUNT_ERRORS.E_GT_T);
            if (totalAmount > transaction.tAmount)
                throw new classes_1.RouteError(HttpStatusCodes_1.default.CONFLICT, AMOUNT_ERRORS.Es_GT_T);
        }
    });
}
function totalAmountByTransaction(transaction_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractions = yield getByTransactionId(transaction_id);
        let total = 0;
        extractions === null || extractions === void 0 ? void 0 : extractions.forEach(ext => {
            total += ext.eAmount;
        });
        return total;
    });
}
exports.default = {
    getAll,
    getById,
    addOne,
    updateOne,
    delete: _delete,
};
