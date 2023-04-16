import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/other/classes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { DepositService } from "@src/services";


/**
 * Get all.
 */
async function getAll(_: IReq, res: IRes) {
    const deposits = await DepositService.getAll();
    return res.status(HttpStatusCodes.OK).json({ deposits });
}

/**
 * Get one.
 */
async function getById(req: IReq, res: IRes) {
    try {
        const id = +req.params.id;
        const deposit = await DepositService.getById(id);
        return res.status(HttpStatusCodes.OK).json({ deposit });
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
} as const;
