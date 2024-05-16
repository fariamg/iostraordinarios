import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableTags1615388649813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.tags;
    `);
  }
}
