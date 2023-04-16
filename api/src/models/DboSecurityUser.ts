import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class DboSecurityUser {

    @PrimaryKey()
    public id!: number;

    @Property({ length: 30 })
    public uUsername!: string;

    @Property({ length: 30 })
    public uPassword!: string;

}
