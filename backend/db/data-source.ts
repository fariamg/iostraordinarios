import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/user/entities/user.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: [User],
    migrations: ['dist/db/migrations/*.js'],
    migrationsRun: true,
    synchronize: true
    // ssl: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
