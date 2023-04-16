"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' +
    'object with the appropriate user keys.';
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
function new_(name, email, role, pwdHash, id) {
    return {
        id: (id !== null && id !== void 0 ? id : -1),
        name: (name !== null && name !== void 0 ? name : ''),
        email: (email !== null && email !== void 0 ? email : ''),
        role: (role !== null && role !== void 0 ? role : UserRoles.Standard),
        pwdHash: (pwdHash !== null && pwdHash !== void 0 ? pwdHash : ''),
    };
}
function from(param) {
    if (!isUser(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param;
    return new_(p.name, p.email, p.role, p.pwdHash, p.id);
}
function isUser(arg) {
    return (!!arg &&
        typeof arg === 'object' &&
        'id' in arg &&
        'email' in arg &&
        'name' in arg &&
        'role' in arg);
}
exports.default = {
    new: new_,
    from,
    isUser,
};
