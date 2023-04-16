import { EntityRepository } from "@mikro-orm/core";
import { DboResellTransaction } from "@src/models";

export class TransactionRepository
    extends EntityRepository<DboResellTransaction> {

}