import { ConnectionOptions } from 'typeorm';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  port: 5432,
  synchronize: true,
  // migrationsRun: true, // se precisar rodar novas migrations;
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/src/app/entities/*.{js,ts}`],
  migrations: [`${__dirname}/src/database/migrations/*.{js,ts}`],
  cli: {
    migrationsDir: `${__dirname}/src/database/migrations`,
    entitiesDir: `${__dirname}/src/app/entities`,
  },
};

export default config;
