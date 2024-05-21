import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableJourneysTags1716258108898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE journeys_tags (
            journey_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (journey_id, tag_id),
            FOREIGN KEY (journey_id) REFERENCES journeys(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE journeys_tags;`);
    }

}
