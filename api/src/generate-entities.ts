import { MikroORM } from '@mikro-orm/core';
import EnvVars from './constants/EnvVars';

import { config } from 'dotenv';

(async () => {
    config();

    const orm = await MikroORM.init({
        discovery: {
            warnWhenNoEntities: false,
        },
        host: EnvVars.Database.host,
        port: EnvVars.Database.port,
        dbName: EnvVars.Database.name,
        user: EnvVars.Database.user,
        password: EnvVars.Database.password,
        type: 'postgresql',
        entityGenerator: {
            bidirectionalRelations: true,
            identifiedReferences: true,
        },
    });

    const generator = orm.getEntityGenerator();

    await generator.generate({
        save: true,
        baseDir: process.cwd() + '/src/models',
    });

    await orm.close(true);
})();