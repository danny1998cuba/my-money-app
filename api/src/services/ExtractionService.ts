import { wrap } from '@mikro-orm/core';

import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DI } from '@src/server';
import { DboResellExtraction } from '@src/models';


// **** Variables **** //

export const EXTRACTION_NOT_FOUND_ERR = 'Extraction not found';
const AMOUNT_ERRORS = {
    E_GT_T: 'The extraction amount must be less than the transaction amount',
    Es_GT_T: 'The amount is bigger than the remaining capacity',
};

// **** Functions **** //

function getAll() {
    const repo = DI.extractionRepository;
    return repo?.findAll();
}

async function getById(id: number) {
    const repo = DI.extractionRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        return founded;
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            EXTRACTION_NOT_FOUND_ERR,
        );
    }
}

async function getByTransactionId(transaction_id: number) {
    const repo = DI.extractionRepository;

    try {
        const founded = await repo?.find(
            { t: DI.transactionRepository?.getReference(transaction_id) },
        );
        return founded;
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            EXTRACTION_NOT_FOUND_ERR,
        );
    }
}

async function addOne(extraction: DboResellExtraction) {
    const em = DI.em;

    em?.begin();
    const entity = em?.create(DboResellExtraction, extraction);

    try {
        await checkAmount(entity);
        entity?.validate();
        em?.persistAndFlush(entity as DboResellExtraction);
        em?.commit();
    } catch (error) {
        em?.rollback();
        throw error;
    }
}

async function updateOne(extraction: DboResellExtraction) {
    const em = DI.em;

    em?.begin();


    try {
        const founded = await em?.findOneOrFail(DboResellExtraction,
            { id: extraction.id });
        const modified = wrap(founded).assign(extraction);
        await checkAmount(modified);
        modified?.validate();
        em?.flush();
        em?.commit();
    } catch (error) {
        if (error instanceof RouteError) {
            em?.rollback();
            throw error;
        } else
            throw new RouteError(
                HttpStatusCodes.NOT_FOUND,
                EXTRACTION_NOT_FOUND_ERR,
            );
    }
}

async function _delete(id: number) {
    const repo = DI.extractionRepository;

    try {
        const founded = await repo?.findOneOrFail({ id: id });
        if (founded)
            return repo?.removeAndFlush(founded);
    } catch (error) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            EXTRACTION_NOT_FOUND_ERR,
        );
    }
}

async function checkAmount(extraction: DboResellExtraction | undefined) {
    const transaction = await DI.transactionRepository?.findOne(
        { id: extraction?.t.id },
    );

    let totalAmount = 0;
    if (transaction?.id)
        totalAmount = await totalAmountByTransaction(transaction.id);

    if (extraction?.eAmount && transaction?.tAmount) {
        if (extraction.eAmount > transaction.tAmount)
            throw new RouteError(
                HttpStatusCodes.CONFLICT,
                AMOUNT_ERRORS.E_GT_T,
            );
        if (totalAmount > transaction.tAmount)
            throw new RouteError(
                HttpStatusCodes.CONFLICT,
                AMOUNT_ERRORS.Es_GT_T,
            );
    }
}

async function totalAmountByTransaction(transaction_id: number) {
    const extractions = await getByTransactionId(transaction_id);
    let total = 0;
    extractions?.forEach(ext => {
        total += ext.eAmount;
    });
    return total;
}


// **** Export default **** //

export default {
    getAll,
    getById,
    addOne,
    updateOne,
    delete: _delete,
} as const;
