import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToUser1715740496538 implements MigrationInterface {
    name = 'AddColumnsToUser1715740496538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tags" ("user_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_1383f92433abfd0fed78029375b" PRIMARY KEY ("user_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1876d8f8eff4211b216364381e" ON "user_tags" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_082dadc021168fef6e1afd42ad" ON "user_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "position" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "nuts" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "superpower_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_43ba93036690c52412ad54cb40e" UNIQUE ("superpower_id")`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'leader', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_43ba93036690c52412ad54cb40e" FOREIGN KEY ("superpower_id") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1876d8f8eff4211b216364381ec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_082dadc021168fef6e1afd42ad7" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_082dadc021168fef6e1afd42ad7"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_1876d8f8eff4211b216364381ec"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_43ba93036690c52412ad54cb40e"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_43ba93036690c52412ad54cb40e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "superpower_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nuts"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_082dadc021168fef6e1afd42ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1876d8f8eff4211b216364381e"`);
        await queryRunner.query(`DROP TABLE "user_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
