import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePublishesSuperpowers1716258135350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE publishes_superpowers (
            publish_id INTEGER NOT NULL,
            superpower_id INTEGER NOT NULL,
            PRIMARY KEY (publish_id, superpower_id),
            FOREIGN KEY (publish_id) REFERENCES publishes(id) ON DELETE CASCADE,
            FOREIGN KEY (superpower_id) REFERENCES superpowers(id) ON DELETE CASCADE
        );
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE publishes_superpowers;`);
    }

}
