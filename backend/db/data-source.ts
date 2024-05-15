import env from "config/env";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: env().database.host,
    port: Number(env().database.port),
    username: env().database.username,
    password: env().database.password,
    database: env().database.database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    // migrationsRun: true,
    synchronize: false,
    ssl: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
