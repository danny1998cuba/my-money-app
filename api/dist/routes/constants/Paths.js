"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Paths = {
    Base: '/api',
    Users: {
        Base: '/users',
        All: '',
        Get: '/:id',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Currency: {
        Base: '/currency',
        All: '',
        Get: '/:id',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Resell: {
        Base: '/resell',
        Deposit: {
            Base: '/deposit',
            All: '',
            Get: '/:id',
        },
        Extraction: {
            Base: '/extraction',
            All: '',
            Get: '/:id',
            Add: '/add',
            Update: '/update',
            Delete: '/delete/:id',
        },
        Transaction: {
            Base: '/transaction',
            All: '',
            Get: '/:id',
            Add: '/add',
            Update: '/update',
            Delete: '/delete/:id',
        },
    },
};
exports.default = Paths;
