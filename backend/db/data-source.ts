import env from "config/env";
import { DataSource, DataSourceOptions } from "typeorm";


console.log(env().database.host);
console.log(env().database.port);
console.log(env().database.username);
console.log(env().database.password);
console.log(env().database.database);


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: env().database.host,
    port: Number(env().database.port),
    username: env().database.username,
    password: env().database.password,
    database: env().database.database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    migrationsRun: true,
    synchronize: false
    // ssl: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
