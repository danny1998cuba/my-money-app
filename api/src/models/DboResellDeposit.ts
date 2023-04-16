import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, Property }
    from '@mikro-orm/core';
import { DboResellTransaction } from './DboResellTransaction';
import { DepositRepository } from '@src/repos';

@Entity({ customRepository: () => DepositRepository })
export class DboResellDeposit {

    @PrimaryKey()
    public id!: number;

    @Property({ columnType: 'float8' })
    public dAmount!: number;

    @Property({ columnType: 'float8' })
    public dCost!: number;

    @Property({ length: 255, nullable: true })
    public dDescription?: string;

    @ManyToOne({
        entity: () => DboResellTransaction,
        wrappedReference: true,
        onUpdateIntegrity: 'cascade',
        onDelete: 'cascade',
    })
    public t!: IdentifiedReference<DboResellTransaction>;

    public static isEntity(arg: unknown): boolean {
        return (
            !!arg &&
            typeof arg === 'object' &&
            'dAmount' in arg &&
            'dCost' in arg
        );
    }
}
