import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1716158488282 implements MigrationInterface {
    name = 'NewMigration1716158488282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journeys" ADD "tempField" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journeys" DROP COLUMN "tempField"`);
    }

}
