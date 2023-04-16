import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, Property }
    from '@mikro-orm/core';
import { DboResellTransaction } from './DboResellTransaction';
import { ExtractionRepository } from '@src/repos';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const ENTITY_ERRORS = {
    NO_PRICE: 'The sell price is required',
    ENTITY_CONFLICT: 'The extraction attributes are in conflict',
};

@Entity({ customRepository: () => ExtractionRepository })
export class DboResellExtraction {

    @PrimaryKey()
    public id!: number;

    @Property({ columnType: 'float8' })
    public eAmount!: number;

    @Property({ length: 255, nullable: true })
    public eDescription?: string;

    @Property({ columnType: 'float8', nullable: true })
    public eMlc?: number;

    @Property({ columnType: 'float8', nullable: true })
    public eDiscount?: number;

    @Property({ columnType: 'float8', nullable: true })
    public eSellPrice?: number;

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
            'eAmount' in arg
        );
    }

    public validate() {
        if (this) {
            if (this.eMlc) {
                if (!this.eSellPrice) {
                    throw new RouteError(
                        HttpStatusCodes.BAD_REQUEST,
                        ENTITY_ERRORS.NO_PRICE,
                    );
                }
            } else {
                if (this.eSellPrice || this.eDiscount) {
                    throw new RouteError(
                        HttpStatusCodes.BAD_REQUEST,
                        ENTITY_ERRORS.ENTITY_CONFLICT,
                    );
                }
            }
        }
    }
}
