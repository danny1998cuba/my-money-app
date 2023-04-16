import { EntityManager, MikroORM } from "@mikro-orm/core";
import {
    CurrencyRepository, DepositRepository,
    ExtractionRepository, TransactionRepository,
} from "@src/repos";

export type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};

export type IOrm = {
    orm?: MikroORM,
    em?: EntityManager,
    // Repositories
    currencyRepository?: CurrencyRepository
    depositRepository?: DepositRepository
    extractionRepository?: ExtractionRepository
    transactionRepository?: TransactionRepository
}