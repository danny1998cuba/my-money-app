"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Paths_1 = __importDefault(require("./Paths"));
function getFullPaths(parent, baseUrl) {
    const url = (baseUrl + parent.Base), keys = Object.keys(parent), retVal = { Base: url };
    for (const key of keys) {
        const pval = parent[key];
        if (key !== 'Base' && typeof pval === 'string') {
            retVal[key] = (url + pval);
        }
        else if (typeof pval === 'object') {
            retVal[key] = getFullPaths(pval, url);
        }
    }
    return retVal;
}
exports.default = getFullPaths(Paths_1.default, '');
