import { Options } from "@mikro-orm/core";
import EnvVars from '@src/constants/EnvVars';

const config: Options = {
    entities: ['./dist/models'],
    entitiesTs: ['./src/models'],
    host: EnvVars.Database.host,
    port: EnvVars.Database.port,
    dbName: EnvVars.Database.name,
    user: EnvVars.Database.user,
    password: EnvVars.Database.password,
    type: 'postgresql',
};

export default config;