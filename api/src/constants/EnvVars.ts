/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */
import dotenv from 'dotenv';

dotenv.config();

export default {
    NodeEnv: (process.env.NODE_ENV ?? ''),
    Port: (process.env.PORT ?? 0),
    CookieProps: {
        Key: 'ExpressGeneratorTs',
        Secret: (process.env.COOKIE_SECRET ?? ''),
        // Casing to match express cookie options
        Options: {
            httpOnly: true,
            signed: true,
            path: (process.env.COOKIE_PATH ?? ''),
            maxAge: Number(process.env.COOKIE_EXP ?? 0),
            domain: (process.env.COOKIE_DOMAIN ?? ''),
            secure: (process.env.SECURE_COOKIE === 'true'),
        },
    },
    Jwt: {
        Secret: (process.env.JWT_SECRET ?? ''),
        Exp: (process.env.COOKIE_EXP ?? ''),
        // exp at the same time as the cookie
    },
    Database: {
        host: (process.env.DB_HOST ?? ''),
        port: Number(process.env.DB_PORT ?? 0),
        user: (process.env.DB_USER ?? ''),
        password: (process.env.DB_PASSWORD ?? ''),
        name: (process.env.DB_NAME ?? ''),
    },
} as const;
