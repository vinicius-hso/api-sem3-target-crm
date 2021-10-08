"use strict";
// Check typeORM documentation for more information.
var config = {
    type: 'postgres',
    port: 5432,
    // logging: ['query', 'error'],
    synchronize: true,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['./src/app/entities/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: './src/app/entities',
    },
};
module.exports = config;