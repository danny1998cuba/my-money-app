import { wrap } from '@mikro-orm/core';

import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DI } from '@src/server';
import { DboCommonsCurrency } from '@src/models';


// **** Variables **** //

export const CURRENCY_NOT_FOUND_ERR = 'Currency not found';


// **** Functions **** //

function getAll() {
    const repo = DI.currencyRepository;
    return repo?.findAll();
}

async function getById(id: number) {
    const repo = DI.currencyRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        return founded;
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            CURRENCY_NOT_FOUND_ERR,
        );
    }
}

function addOne(curr: DboCommonsCurrency) {
    const repo = DI.currencyRepository;
    const entity = repo?.create(curr);
    return repo?.persistAndFlush(entity as DboCommonsCurrency);
}

async function updateOne(curr: DboCommonsCurrency) {
    const repo = DI.currencyRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: curr.id });
        wrap(founded).assign(curr);
        return repo?.flush();
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            CURRENCY_NOT_FOUND_ERR,
        );
    }
}

async function _delete(id: number) {
    const repo = DI.currencyRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        if (founded)
            return repo?.removeAndFlush(founded);
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            CURRENCY_NOT_FOUND_ERR,
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
