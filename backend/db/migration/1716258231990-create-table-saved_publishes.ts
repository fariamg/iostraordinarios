import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSavedPublishes1716258231990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE saved_publishes (
            user_id INTEGER NOT NULL,
            publish_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, publish_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (publish_id) REFERENCES publishes(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE saved_publishes;`);
    }

}
