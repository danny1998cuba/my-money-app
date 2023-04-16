import { Collection, Entity, OneToMany, PrimaryKey, Property }
    from '@mikro-orm/core';
import { DboResellTransaction } from './DboResellTransaction';
import { CurrencyRepository } from '@src/repos';

@Entity({ customRepository: () => CurrencyRepository })
export class DboCommonsCurrency {

    @PrimaryKey()
    public id!: number;

    @Property({ length: 3 })
    public currIdentifier!: string;

    @Property({ columnType: 'float8', nullable: true })
    public currExchangeRate?: number;

    @OneToMany({ entity: () => DboResellTransaction, mappedBy: 'tCurrency' })
    public tCurrencyInverse = new Collection<DboResellTransaction>(this);

    public static isEntity(arg: unknown): boolean {
        return (
            !!arg &&
            typeof arg === 'object' &&
            'currIdentifier' in arg
        );
    }
}
