import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableTribes1615388649814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.tribes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        description VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL,
        deleted_at TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.tribes;
    `);
  }
}
