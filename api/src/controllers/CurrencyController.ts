import { UniqueConstraintViolationException } from "@mikro-orm/core";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { DboCommonsCurrency } from "@src/models";
import { RouteError } from "@src/other/classes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { CurrencyService } from "@src/services";


/**
 * Get all.
 */
async function getAll(_: IReq, res: IRes) {
    const currencies = await CurrencyService.getAll();
    return res.status(HttpStatusCodes.OK).json({ currencies });
}

/**
 * Get one.
 */
async function getById(req: IReq, res: IRes) {
    try {
        const id = +req.params.id;
        const currency = await CurrencyService.getById(id);
        return res.status(HttpStatusCodes.OK).json({ currency });
    } catch (error) {
        if (error instanceof RouteError)
            return res.status(error.status).json({ message: error.message });
        else
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();

    }
}

/**
 * Add one.
 */
async function add(req: IReq<{ curr: DboCommonsCurrency }>, res: IRes) {
    try {
        const { curr } = req.body;
        await CurrencyService.addOne(curr);
        return res.status(HttpStatusCodes.CREATED).end();
    } catch (error) {
        if (error instanceof UniqueConstraintViolationException)
            return res.status(HttpStatusCodes.CONFLICT).json(
                { message: 'The currency identifier must be unique.' },
            );
        else
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}

/**
 * Update one.
 */
async function update(req: IReq<{ curr: DboCommonsCurrency }>, res: IRes) {
    try {
        const { curr } = req.body;
        await CurrencyService.updateOne(curr);
        return res.status(HttpStatusCodes.OK).end();
    } catch (error) {
        if (error instanceof RouteError)
            return res.status(error.status).json({ message: error.message });
        else if (error instanceof UniqueConstraintViolationException)
            return res.status(HttpStatusCodes.CONFLICT).json(
                { message: 'The currency identifier must be unique.' },
            );
        else
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}

/**
 * Delete one.
 */
async function delete_(req: IReq, res: IRes) {
    try {
        const id = +req.params.id;
        await CurrencyService.delete(id);
        return res.status(HttpStatusCodes.OK).end();
    } catch (error) {
        if (error instanceof RouteError)
            return res.status(error.status).json({ message: error.message });
        else
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();

    }

}


// **** Export default **** //

export default {
    getAll,
    getById,
    add,
    update,
    delete: delete_,
} as const;
