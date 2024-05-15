import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostEntity1715795531460 implements MigrationInterface {
    name = 'AddPostEntity1715795531460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "superpowers" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "superpowers" ADD "description" character varying(500) NOT NULL`);
    }

}
