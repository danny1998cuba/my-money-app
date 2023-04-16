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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DboResellExtraction = void 0;
const core_1 = require("@mikro-orm/core");
const DboResellTransaction_1 = require("./DboResellTransaction");
const repos_1 = require("@src/repos");
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const ENTITY_ERRORS = {
    NO_PRICE: 'The sell price is required',
    ENTITY_CONFLICT: 'The extraction attributes are in conflict',
};
let DboResellExtraction = class DboResellExtraction {
    static isEntity(arg) {
        return (!!arg &&
            typeof arg === 'object' &&
            'eAmount' in arg);
    }
    validate() {
        if (this) {
            if (this.eMlc) {
                if (!this.eSellPrice) {
                    throw new classes_1.RouteError(HttpStatusCodes_1.default.BAD_REQUEST, ENTITY_ERRORS.NO_PRICE);
                }
            }
            else {
                if (this.eSellPrice || this.eDiscount) {
                    throw new classes_1.RouteError(HttpStatusCodes_1.default.BAD_REQUEST, ENTITY_ERRORS.ENTITY_CONFLICT);
                }
            }
        }
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], DboResellExtraction.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8' }),
    __metadata("design:type", Number)
], DboResellExtraction.prototype, "eAmount", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], DboResellExtraction.prototype, "eDescription", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8', nullable: true }),
    __metadata("design:type", Number)
], DboResellExtraction.prototype, "eMlc", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8', nullable: true }),
    __metadata("design:type", Number)
], DboResellExtraction.prototype, "eDiscount", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'float8', nullable: true }),
    __metadata("design:type", Number)
], DboResellExtraction.prototype, "eSellPrice", void 0);
__decorate([
    (0, core_1.ManyToOne)({
        entity: () => DboResellTransaction_1.DboResellTransaction,
        wrappedReference: true,
        onUpdateIntegrity: 'cascade',
        onDelete: 'cascade',
    }),
    __metadata("design:type", Object)
], DboResellExtraction.prototype, "t", void 0);
DboResellExtraction = __decorate([
    (0, core_1.Entity)({ customRepository: () => repos_1.ExtractionRepository })
], DboResellExtraction);
exports.DboResellExtraction = DboResellExtraction;
