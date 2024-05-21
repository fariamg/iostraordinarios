import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePublishesTags1716258078358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE publishes_tags (
            publish_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (publish_id, tag_id),
            FOREIGN KEY (publish_id) REFERENCES publishes(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE publishes_tags;`);
    }

}
