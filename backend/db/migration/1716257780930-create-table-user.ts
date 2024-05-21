import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1716257780930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            position VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            nuts INTEGER NOT NULL DEFAULT 0,
            bio TEXT DEFAULT 'Olá, estou usando o app Ioasys Journey',
            avatar VARCHAR(255),
            interactions_count INTEGER NOT NULL DEFAULT 0,
            missions_completed INTEGER NOT NULL DEFAULT 0,
            score INTEGER NOT NULL DEFAULT 0,
            publishes_count INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`);
    }

}
