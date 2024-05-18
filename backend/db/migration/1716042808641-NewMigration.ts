import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1716042808641 implements MigrationInterface {
    name = 'NewMigration1716042808641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journeys" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "nuts" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, CONSTRAINT "PK_94b31b067846c92b6811046c81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "superpowers" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, CONSTRAINT "PK_0a0d1cd74366483a42bab3055e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'leader', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "position" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "nuts" integer NOT NULL DEFAULT '0', "bio" text NOT NULL DEFAULT 'Olá, estou usando o app Ioasys Journey', "avatar" character varying, "interactions_count" integer NOT NULL DEFAULT '0', "missions_completed" integer NOT NULL DEFAULT '0', "score" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "superpowerId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journeys_users" ("journeysId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_f43dc8637507d3c55f98e0da1f3" PRIMARY KEY ("journeysId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_976a09073749651ca0171e097d" ON "journeys_users" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3dba0b04f0ea1dc47cb41f9d7" ON "journeys_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "journeys_tags" ("journeysId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_0a8edfea71b3aad070a3ca9cb8b" PRIMARY KEY ("journeysId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7fd3c4bc3b3e4588deccf79142" ON "journeys_tags" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aea75be239cb875615663d106d" ON "journeys_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "journeys_superpowers" ("journeysId" integer NOT NULL, "superpowersId" integer NOT NULL, CONSTRAINT "PK_5ee78153060552ac0697ca5d8d2" PRIMARY KEY ("journeysId", "superpowersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ace6de1700ed381dcc18baf663" ON "journeys_superpowers" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_53aa66ee4e37ce3fbbc365248b" ON "journeys_superpowers" ("superpowersId") `);
        await queryRunner.query(`CREATE TABLE "posts_tags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_af443546fce87648e2c2ba411c4" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43eb26a55c240c71497c76f281" ON "posts_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_56be2a177c90e0adf8444f2e36" ON "posts_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "posts_superpowers" ("postsId" integer NOT NULL, "superpowersId" integer NOT NULL, CONSTRAINT "PK_30c6be9e75d0fb8a04116a2ba9f" PRIMARY KEY ("postsId", "superpowersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21d1f8e208c46470486d87ab7c" ON "posts_superpowers" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_141d49049d4f2f10f67b627dc2" ON "posts_superpowers" ("superpowersId") `);
        await queryRunner.query(`CREATE TABLE "users_tags" ("user_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_7f29e59d4fa87411d3fa79c5db4" PRIMARY KEY ("user_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37fe67a713a33c9385ede5782d" ON "users_tags" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee316e71a670dca8d696490aee" ON "users_tags" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "saved_posts" ("user_id" integer NOT NULL, "post_id" integer NOT NULL, CONSTRAINT "PK_837a562f71fec3009c9af77ee53" PRIMARY KEY ("user_id", "post_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78c961371a509e86d789714dd4" ON "saved_posts" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_116e9df57f5221cc1a77c3d1cf" ON "saved_posts" ("post_id") `);
        await queryRunner.query(`ALTER TABLE "journeys" ADD CONSTRAINT "FK_6479cea41ce0ce155e8bbb7c85c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_659b5a8419cefc2425a4e72676a" FOREIGN KEY ("superpowerId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_users" ADD CONSTRAINT "FK_976a09073749651ca0171e097d9" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_users" ADD CONSTRAINT "FK_a3dba0b04f0ea1dc47cb41f9d7e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" ADD CONSTRAINT "FK_7fd3c4bc3b3e4588deccf791422" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" ADD CONSTRAINT "FK_aea75be239cb875615663d106dd" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" ADD CONSTRAINT "FK_ace6de1700ed381dcc18baf663f" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" ADD CONSTRAINT "FK_53aa66ee4e37ce3fbbc365248b6" FOREIGN KEY ("superpowersId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_43eb26a55c240c71497c76f2812" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_superpowers" ADD CONSTRAINT "FK_21d1f8e208c46470486d87ab7c2" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_superpowers" ADD CONSTRAINT "FK_141d49049d4f2f10f67b627dc20" FOREIGN KEY ("superpowersId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tags" ADD CONSTRAINT "FK_37fe67a713a33c9385ede5782df" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tags" ADD CONSTRAINT "FK_ee316e71a670dca8d696490aeeb" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_posts" ADD CONSTRAINT "FK_78c961371a509e86d789714dd4f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "saved_posts" ADD CONSTRAINT "FK_116e9df57f5221cc1a77c3d1cfe" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_posts" DROP CONSTRAINT "FK_116e9df57f5221cc1a77c3d1cfe"`);
        await queryRunner.query(`ALTER TABLE "saved_posts" DROP CONSTRAINT "FK_78c961371a509e86d789714dd4f"`);
        await queryRunner.query(`ALTER TABLE "users_tags" DROP CONSTRAINT "FK_ee316e71a670dca8d696490aeeb"`);
        await queryRunner.query(`ALTER TABLE "users_tags" DROP CONSTRAINT "FK_37fe67a713a33c9385ede5782df"`);
        await queryRunner.query(`ALTER TABLE "posts_superpowers" DROP CONSTRAINT "FK_141d49049d4f2f10f67b627dc20"`);
        await queryRunner.query(`ALTER TABLE "posts_superpowers" DROP CONSTRAINT "FK_21d1f8e208c46470486d87ab7c2"`);
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c"`);
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_43eb26a55c240c71497c76f2812"`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" DROP CONSTRAINT "FK_53aa66ee4e37ce3fbbc365248b6"`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" DROP CONSTRAINT "FK_ace6de1700ed381dcc18baf663f"`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" DROP CONSTRAINT "FK_aea75be239cb875615663d106dd"`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" DROP CONSTRAINT "FK_7fd3c4bc3b3e4588deccf791422"`);
        await queryRunner.query(`ALTER TABLE "journeys_users" DROP CONSTRAINT "FK_a3dba0b04f0ea1dc47cb41f9d7e"`);
        await queryRunner.query(`ALTER TABLE "journeys_users" DROP CONSTRAINT "FK_976a09073749651ca0171e097d9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_659b5a8419cefc2425a4e72676a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad"`);
        await queryRunner.query(`ALTER TABLE "journeys" DROP CONSTRAINT "FK_6479cea41ce0ce155e8bbb7c85c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_116e9df57f5221cc1a77c3d1cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78c961371a509e86d789714dd4"`);
        await queryRunner.query(`DROP TABLE "saved_posts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee316e71a670dca8d696490aee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37fe67a713a33c9385ede5782d"`);
        await queryRunner.query(`DROP TABLE "users_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_141d49049d4f2f10f67b627dc2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21d1f8e208c46470486d87ab7c"`);
        await queryRunner.query(`DROP TABLE "posts_superpowers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56be2a177c90e0adf8444f2e36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43eb26a55c240c71497c76f281"`);
        await queryRunner.query(`DROP TABLE "posts_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53aa66ee4e37ce3fbbc365248b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ace6de1700ed381dcc18baf663"`);
        await queryRunner.query(`DROP TABLE "journeys_superpowers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aea75be239cb875615663d106d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fd3c4bc3b3e4588deccf79142"`);
        await queryRunner.query(`DROP TABLE "journeys_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3dba0b04f0ea1dc47cb41f9d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_976a09073749651ca0171e097d"`);
        await queryRunner.query(`DROP TABLE "journeys_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "superpowers"`);
        await queryRunner.query(`DROP TABLE "journeys"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
