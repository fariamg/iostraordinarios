import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableSuperpowers1615388649812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.superpowers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL,
        deleted_at TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.superpowers;
    `);
  }
}
