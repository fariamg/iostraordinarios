import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSuperpower1716257810605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE superpowers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(500) NOT NULL
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE superpowers;`);
    }

}
