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
exports.DboResellDeposit = void 0;
const core_1 = require("@mikro-orm/core");
const DboResellTransaction_1 = require("./DboResellTransaction");
const repos_1 = require("@src/repos");
let DboResellDeposit = class DboResellDeposit {
    static isEntity(arg) {
        return (!!arg &&
            typeof arg === 'object' &&
            'dAmount' in arg &&
            'dCost' in arg);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], DboResellDeposit.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8' }),
    __metadata("design:type", Number)
], DboResellDeposit.prototype, "dAmount", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8' }),
    __metadata("design:type", Number)
], DboResellDeposit.prototype, "dCost", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], DboResellDeposit.prototype, "dDescription", void 0);
__decorate([
    (0, core_1.ManyToOne)({
        entity: () => DboResellTransaction_1.DboResellTransaction,
        wrappedReference: true,
        onUpdateIntegrity: 'cascade',
        onDelete: 'cascade',
    }),
    __metadata("design:type", Object)
], DboResellDeposit.prototype, "t", void 0);
DboResellDeposit = __decorate([
    (0, core_1.Entity)({ customRepository: () => repos_1.DepositRepository })
], DboResellDeposit);
exports.DboResellDeposit = DboResellDeposit;
