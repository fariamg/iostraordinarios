import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    migrationsRun: true,
    synchronize: true
    // ssl: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
