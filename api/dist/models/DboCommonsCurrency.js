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
exports.DboCommonsCurrency = void 0;
const core_1 = require("@mikro-orm/core");
const DboResellTransaction_1 = require("./DboResellTransaction");
const repos_1 = require("@src/repos");
let DboCommonsCurrency = class DboCommonsCurrency {
    constructor() {
        this.tCurrencyInverse = new core_1.Collection(this);
    }
    static isEntity(arg) {
        return (!!arg &&
            typeof arg === 'object' &&
            'currIdentifier' in arg);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], DboCommonsCurrency.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 3 }),
    __metadata("design:type", String)
], DboCommonsCurrency.prototype, "currIdentifier", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8', nullable: true }),
    __metadata("design:type", Number)
], DboCommonsCurrency.prototype, "currExchangeRate", void 0);
__decorate([
    (0, core_1.OneToMany)({ entity: () => DboResellTransaction_1.DboResellTransaction, mappedBy: 'tCurrency' }),
    __metadata("design:type", Object)
], DboCommonsCurrency.prototype, "tCurrencyInverse", void 0);
DboCommonsCurrency = __decorate([
    (0, core_1.Entity)({ customRepository: () => repos_1.CurrencyRepository })
], DboCommonsCurrency);
exports.DboCommonsCurrency = DboCommonsCurrency;
