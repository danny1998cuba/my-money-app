import {
    Collection, Entity, IdentifiedReference,
    ManyToOne, OneToMany, PrimaryKey, Property,
} from '@mikro-orm/core';
import { DboCommonsCurrency } from './DboCommonsCurrency';
import { DboResellExtraction } from './DboResellExtraction';
import { TransactionRepository } from '@src/repos';
import { DboResellDeposit } from './DboResellDeposit';

@Entity({ customRepository: () => TransactionRepository })
export class DboResellTransaction {

    @PrimaryKey()
    public id!: number;

    @Property({ columnType: 'date' })
    public tDate!: string;

    @Property({ columnType: 'float8' })
    public tAmount!: number;

    @Property({ columnType: 'float8' })
    public tSpent!: number;

    @ManyToOne({
        entity: () => DboCommonsCurrency,
        wrappedReference: true,
        fieldName: 't_currency',
        nullable: true,
    })
    public tCurrency?: IdentifiedReference<DboCommonsCurrency>;

    @OneToMany({ entity: () => DboResellExtraction, mappedBy: 't' })
    public tInverse = new Collection<DboResellExtraction>(this);

    @OneToMany({ entity: () => DboResellDeposit, mappedBy: 't' })
    public deposits = new Collection<DboResellDeposit>(this);

    public static isEntity(arg: unknown): boolean {
        return (
            !!arg &&
            typeof arg === 'object' &&
            'tDate' in arg &&
            'tAmount' in arg &&
            'tSpent' in arg
        );
    }
}
