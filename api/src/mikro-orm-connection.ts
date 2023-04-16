import { IOrm } from "./other/types";
import { MikroORM } from '@mikro-orm/core';
import config from "./mikro-orm.config";
import {
    DboCommonsCurrency, DboResellDeposit,
    DboResellExtraction, DboResellTransaction,
} from "./models";

export const connection = async (DI: IOrm): Promise<void> => {

    const orm = await MikroORM.init(config);

    DI.orm = orm;
    DI.em = orm.em;
    DI.currencyRepository = orm.em.getRepository(DboCommonsCurrency);
    DI.depositRepository = orm.em.getRepository(DboResellDeposit);
    DI.extractionRepository = orm.em.getRepository(DboResellExtraction);
    DI.transactionRepository = orm.em.getRepository(DboResellTransaction);
};