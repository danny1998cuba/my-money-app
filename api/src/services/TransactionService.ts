import { wrap } from '@mikro-orm/core';

import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DI } from '@src/server';
import { DboResellTransaction } from '@src/models';


// **** Variables **** //

export const TRANSACTION_NOT_FOUND_ERR = 'Transaction not found';


// **** Functions **** //

function getAll() {
    const repo = DI.transactionRepository;
    return repo?.findAll();
}

async function getById(id: number) {
    const repo = DI.transactionRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        return founded;
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            TRANSACTION_NOT_FOUND_ERR,
        );
    }
}

function addOne(transaction: DboResellTransaction) {
    const repo = DI.transactionRepository;
    const entity = repo?.create(transaction);
   
    if (entity?.deposits.getItems().length == 0) {
        throw new RouteError(
            HttpStatusCodes.BAD_REQUEST,
            'Deposits are required',
        );
    }

    let total_amount = 0, total_cost = 0;
    entity?.deposits.getItems().forEach(dep => {
        total_amount += dep.dAmount;
        total_cost += dep.dCost;
    });
  
    if (total_amount != transaction.tAmount
        || total_cost != transaction.tSpent) {
        throw new RouteError(
            HttpStatusCodes.CONFLICT,
            'Incoherence on deposits data',
        );
    }

    return repo?.persistAndFlush(entity as DboResellTransaction);
}

async function updateOne(transaction: DboResellTransaction) {
    const repo = DI.transactionRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: transaction.id });
        wrap(founded).assign(transaction);
        return repo?.flush();
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            TRANSACTION_NOT_FOUND_ERR,
        );
    }
}

async function _delete(id: number) {
    const repo = DI.transactionRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        if (founded)
            return repo?.removeAndFlush(founded);
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            TRANSACTION_NOT_FOUND_ERR,
        );
    }
}


// **** Export default **** //

export default {
    getAll,
    getById,
    addOne,
    updateOne,
    delete: _delete,
} as const;
