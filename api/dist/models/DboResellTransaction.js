"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DboResellTransaction = void 0;
const core_1 = require("@mikro-orm/core");
const DboCommonsCurrency_1 = require("./DboCommonsCurrency");
const DboResellExtraction_1 = require("./DboResellExtraction");
const repos_1 = require("@src/repos");
const DboResellDeposit_1 = require("./DboResellDeposit");
let DboResellTransaction = class DboResellTransaction {
    constructor() {
        this.tInverse = new core_1.Collection(this);
        this.deposits = new core_1.Collection(this);
    }
    static isEntity(arg) {
        return (!!arg &&
            typeof arg === 'object' &&
            'tDate' in arg &&
            'tAmount' in arg &&
            'tSpent' in arg);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], DboResellTransaction.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'date' }),
    __metadata("design:type", String)
], DboResellTransaction.prototype, "tDate", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8' }),
    __metadata("design:type", Number)
], DboResellTransaction.prototype, "tAmount", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8' }),
    __metadata("design:type", Number)
], DboResellTransaction.prototype, "tSpent", void 0);
__decorate([
    (0, core_1.ManyToOne)({
        entity: () => DboCommonsCurrency_1.DboCommonsCurrency,
        wrappedReference: true,
        fieldName: 't_currency',
        nullable: true,
    }),
    __metadata("design:type", Object)
], DboResellTransaction.prototype, "tCurrency", void 0);
__decorate([
    (0, core_1.OneToMany)({ entity: () => DboResellExtraction_1.DboResellExtraction, mappedBy: 't' }),
    __metadata("design:type", Object)
], DboResellTransaction.prototype, "tInverse", void 0);
__decorate([
    (0, core_1.OneToMany)({ entity: () => DboResellDeposit_1.DboResellDeposit, mappedBy: 't' }),
    __metadata("design:type", Object)
], DboResellTransaction.prototype, "deposits", void 0);
DboResellTransaction = __decorate([
    (0, core_1.Entity)({ customRepository: () => repos_1.TransactionRepository })
], DboResellTransaction);
exports.DboResellTransaction = DboResellTransaction;
