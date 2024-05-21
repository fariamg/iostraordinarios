import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableJourneysSuperpowers1716258168494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE journeys_superpowers (
            journey_id INTEGER NOT NULL,
            superpower_id INTEGER NOT NULL,
            PRIMARY KEY (journey_id, superpower_id),
            FOREIGN KEY (journey_id) REFERENCES journeys(id) ON DELETE CASCADE,
            FOREIGN KEY (superpower_id) REFERENCES superpowers(id) ON DELETE CASCADE
            );
        `);  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE journeys_superpowers;`);
    }

}
