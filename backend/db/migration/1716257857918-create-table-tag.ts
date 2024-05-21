import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTag1716257857918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE tags;`);
    }

}
