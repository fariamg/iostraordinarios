import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableJourney1716257964625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE journeys (
            id SERIAL PRIMARY KEY,
            title VARCHAR(500) NOT NULL,
            description VARCHAR(500) NOT NULL,
            nuts INTEGER NOT NULL DEFAULT 0,
            creator_id INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE journeys;`);
    }

}
