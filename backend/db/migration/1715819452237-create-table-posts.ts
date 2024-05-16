import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePosts1615388649816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.posts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        description VARCHAR(500) NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL,
        deleted_at TIMESTAMP,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE public.posts_tags (
        post_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (post_id, tag_id),
        CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE,
        CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.posts_tags;
    `);

    await queryRunner.query(`
      DROP TABLE public.posts;
    `);
  }
}
