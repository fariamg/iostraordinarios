import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComment1716257913631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            body TEXT NOT NULL,
            creator_id INTEGER NOT NULL,
            publish_id INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMP,
            FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (publish_id) REFERENCES publishes(id) ON DELETE CASCADE
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE comments;`);
    }

}
