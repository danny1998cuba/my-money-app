import { wrap } from '@mikro-orm/core';

import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DI } from '@src/server';
import { DboResellDeposit } from '@src/models';


// **** Variables **** //

export const DEPOSIT_NOT_FOUND_ERR = 'Deposit not found';


// **** Functions **** //

function getAll() {
    const repo = DI.depositRepository;
    return repo?.findAll();
}

async function getById(id: number) {
    const repo = DI.depositRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        return founded;
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            DEPOSIT_NOT_FOUND_ERR,
        );
    }
}

function addOne(deposit: DboResellDeposit) {
    const repo = DI.depositRepository;
    const entity = repo?.create(deposit);
    return repo?.persistAndFlush(entity as DboResellDeposit);
}

async function updateOne(deposit: DboResellDeposit) {
    const repo = DI.depositRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: deposit.id });
        wrap(founded).assign(deposit);
        return repo?.flush();
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            DEPOSIT_NOT_FOUND_ERR,
        );
    }
}

async function _delete(id: number) {
    const repo = DI.depositRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        if (founded)
            return repo?.removeAndFlush(founded);
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            DEPOSIT_NOT_FOUND_ERR,
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
