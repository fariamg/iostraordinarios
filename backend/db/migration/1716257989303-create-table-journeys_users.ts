import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableJourneysUsers1716257989303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE journeys_users (
            journeysId INTEGER NOT NULL,
            UsersID INTEGER NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            completedAt TIMESTAMP,
            PRIMARY KEY (journeysId, UsersID),
            FOREIGN KEY (journeysId) REFERENCES journeys(id) ON DELETE CASCADE,
            FOREIGN KEY (UsersID) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE journeys_users;`);
    }

}
