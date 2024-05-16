import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUsers1615388649815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        position VARCHAR NOT NULL,
        role VARCHAR NOT NULL DEFAULT 'USER',
        nuts INT NOT NULL DEFAULT 0,
        superpower_id INTEGER,
        tribe_id INTEGER,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL,
        deleted_at TIMESTAMP,
        CONSTRAINT fk_superpower FOREIGN KEY (superpower_id) REFERENCES public.superpowers(id),
        CONSTRAINT fk_tribe FOREIGN KEY (tribe_id) REFERENCES public.tribes(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE public.users_tags (
        user_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (user_id, tag_id),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
        CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.users_tags;
    `);

    await queryRunner.query(`
      DROP TABLE public.users;
    `);
  }
}
