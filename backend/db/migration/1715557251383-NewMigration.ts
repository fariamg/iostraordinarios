import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1715557251383 implements MigrationInterface {
    name = 'NewMigration1715557251383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "desc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a81c946867e625a21a0897d8378" UNIQUE ("desc")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a81c946867e625a21a0897d8378"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "desc"`);
    }

}
