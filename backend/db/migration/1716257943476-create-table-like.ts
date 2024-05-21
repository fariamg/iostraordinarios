import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLike1716257943476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE likes (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL DEFAULT 'like',
            user_id INTEGER NOT NULL,
            publish_id INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMP,
            UNIQUE (user_id, publish_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (publish_id) REFERENCES publishes(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE likes;`);
    }

}
