import { UniqueConstraintViolationException } from '@mikro-orm/core';
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { DboResellExtraction } from "@src/models";
import { RouteError } from "@src/other/classes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { ExtractionService } from "@src/services";


/**
 * Get all.
 */
async function getAll(_: IReq, res: IRes) {
    const extractions = await ExtractionService.getAll();
    return res.status(HttpStatusCodes.OK).json({ extractions });
}

/**
 * Get one.
 */
async function getById(req: IReq, res: IRes) {
    try {
        const id = +req.params.id;
        const extraction = await ExtractionService.getById(id);
        return res.status(HttpStatusCodes.OK).json({ extraction });
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
async function add(
    req: IReq<{ extraction: DboResellExtraction }>, res: IRes) {
    try {
        const { extraction } = req.body;
        await ExtractionService.addOne(extraction);
        return res.status(HttpStatusCodes.CREATED).end();
    } catch (error) {        
        if (error instanceof RouteError)
            return res.status(error.status).json({ message: error.message });
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
async function update(
    req: IReq<{ extraction: DboResellExtraction }>, res: IRes) {
    try {
        const { extraction } = req.body;
        await ExtractionService.updateOne(extraction);
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
        await ExtractionService.delete(id);
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
