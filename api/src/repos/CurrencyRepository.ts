import { EntityRepository } from "@mikro-orm/core";
import { DboCommonsCurrency } from "@src/models";

export class CurrencyRepository
    extends EntityRepository<DboCommonsCurrency> {

}