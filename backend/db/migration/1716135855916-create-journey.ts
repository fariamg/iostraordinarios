import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJourney1716135855916 implements MigrationInterface {
    name = 'CreateJourney1716135855916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "type" "public"."likes_type_enum" NOT NULL DEFAULT 'like', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "publish_id" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journeys" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "nuts" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_94b31b067846c92b6811046c81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "superpowers" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, CONSTRAINT "PK_0a0d1cd74366483a42bab3055e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publishes" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "PK_92e4d75de7fa774e32ca2bc0834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "position" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "nuts" integer NOT NULL DEFAULT '0', "bio" text NOT NULL DEFAULT 'Olá, estou usando o app Ioasys Journey', "avatar" character varying, "interactions_count" integer NOT NULL DEFAULT '0', "missions_completed" integer NOT NULL DEFAULT '0', "score" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "superpowerId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journeys_users" ("journeysId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_f43dc8637507d3c55f98e0da1f3" PRIMARY KEY ("journeysId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_976a09073749651ca0171e097d" ON "journeys_users" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3dba0b04f0ea1dc47cb41f9d7" ON "journeys_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "journeys_tags" ("journeysId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_0a8edfea71b3aad070a3ca9cb8b" PRIMARY KEY ("journeysId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7fd3c4bc3b3e4588deccf79142" ON "journeys_tags" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aea75be239cb875615663d106d" ON "journeys_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "journeys_superpowers" ("journeysId" integer NOT NULL, "superpowersId" integer NOT NULL, CONSTRAINT "PK_5ee78153060552ac0697ca5d8d2" PRIMARY KEY ("journeysId", "superpowersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ace6de1700ed381dcc18baf663" ON "journeys_superpowers" ("journeysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_53aa66ee4e37ce3fbbc365248b" ON "journeys_superpowers" ("superpowersId") `);
        await queryRunner.query(`CREATE TABLE "publishes_tags" ("publishesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_cffd6892dcf4f8f60210e0e3432" PRIMARY KEY ("publishesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b68be1ead05561c3f94e138c66" ON "publishes_tags" ("publishesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_986a0331069110e7837e897748" ON "publishes_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "publishes_superpowers" ("publishesId" integer NOT NULL, "superpowersId" integer NOT NULL, CONSTRAINT "PK_04283ffeae2b146ffe731dab58b" PRIMARY KEY ("publishesId", "superpowersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_02f1e0bad763fb0d8a938c50c0" ON "publishes_superpowers" ("publishesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf20f822139218d27ce09b2ab3" ON "publishes_superpowers" ("superpowersId") `);
        await queryRunner.query(`CREATE TABLE "users_tags" ("user_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_7f29e59d4fa87411d3fa79c5db4" PRIMARY KEY ("user_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37fe67a713a33c9385ede5782d" ON "users_tags" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee316e71a670dca8d696490aee" ON "users_tags" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "saved_publishes" ("user_id" integer NOT NULL, "publish_id" integer NOT NULL, CONSTRAINT "PK_759e4e59310f39a15117b7de5df" PRIMARY KEY ("user_id", "publish_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54cfa8513fc088102dd7da50e7" ON "saved_publishes" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b4a0c0cb859704e877cb90247" ON "saved_publishes" ("publish_id") `);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_b58d01f1fc91c865c6b2f283ff0" FOREIGN KEY ("publish_id") REFERENCES "publishes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys" ADD CONSTRAINT "FK_6479cea41ce0ce155e8bbb7c85c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishes" ADD CONSTRAINT "FK_e45c4c25571e7fb0a496799b918" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_659b5a8419cefc2425a4e72676a" FOREIGN KEY ("superpowerId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_users" ADD CONSTRAINT "FK_976a09073749651ca0171e097d9" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_users" ADD CONSTRAINT "FK_a3dba0b04f0ea1dc47cb41f9d7e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" ADD CONSTRAINT "FK_7fd3c4bc3b3e4588deccf791422" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" ADD CONSTRAINT "FK_aea75be239cb875615663d106dd" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" ADD CONSTRAINT "FK_ace6de1700ed381dcc18baf663f" FOREIGN KEY ("journeysId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" ADD CONSTRAINT "FK_53aa66ee4e37ce3fbbc365248b6" FOREIGN KEY ("superpowersId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishes_tags" ADD CONSTRAINT "FK_b68be1ead05561c3f94e138c66e" FOREIGN KEY ("publishesId") REFERENCES "publishes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publishes_tags" ADD CONSTRAINT "FK_986a0331069110e7837e897748e" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishes_superpowers" ADD CONSTRAINT "FK_02f1e0bad763fb0d8a938c50c01" FOREIGN KEY ("publishesId") REFERENCES "publishes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publishes_superpowers" ADD CONSTRAINT "FK_bf20f822139218d27ce09b2ab32" FOREIGN KEY ("superpowersId") REFERENCES "superpowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tags" ADD CONSTRAINT "FK_37fe67a713a33c9385ede5782df" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tags" ADD CONSTRAINT "FK_ee316e71a670dca8d696490aeeb" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_publishes" ADD CONSTRAINT "FK_54cfa8513fc088102dd7da50e78" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "saved_publishes" ADD CONSTRAINT "FK_6b4a0c0cb859704e877cb90247c" FOREIGN KEY ("publish_id") REFERENCES "publishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_publishes" DROP CONSTRAINT "FK_6b4a0c0cb859704e877cb90247c"`);
        await queryRunner.query(`ALTER TABLE "saved_publishes" DROP CONSTRAINT "FK_54cfa8513fc088102dd7da50e78"`);
        await queryRunner.query(`ALTER TABLE "users_tags" DROP CONSTRAINT "FK_ee316e71a670dca8d696490aeeb"`);
        await queryRunner.query(`ALTER TABLE "users_tags" DROP CONSTRAINT "FK_37fe67a713a33c9385ede5782df"`);
        await queryRunner.query(`ALTER TABLE "publishes_superpowers" DROP CONSTRAINT "FK_bf20f822139218d27ce09b2ab32"`);
        await queryRunner.query(`ALTER TABLE "publishes_superpowers" DROP CONSTRAINT "FK_02f1e0bad763fb0d8a938c50c01"`);
        await queryRunner.query(`ALTER TABLE "publishes_tags" DROP CONSTRAINT "FK_986a0331069110e7837e897748e"`);
        await queryRunner.query(`ALTER TABLE "publishes_tags" DROP CONSTRAINT "FK_b68be1ead05561c3f94e138c66e"`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" DROP CONSTRAINT "FK_53aa66ee4e37ce3fbbc365248b6"`);
        await queryRunner.query(`ALTER TABLE "journeys_superpowers" DROP CONSTRAINT "FK_ace6de1700ed381dcc18baf663f"`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" DROP CONSTRAINT "FK_aea75be239cb875615663d106dd"`);
        await queryRunner.query(`ALTER TABLE "journeys_tags" DROP CONSTRAINT "FK_7fd3c4bc3b3e4588deccf791422"`);
        await queryRunner.query(`ALTER TABLE "journeys_users" DROP CONSTRAINT "FK_a3dba0b04f0ea1dc47cb41f9d7e"`);
        await queryRunner.query(`ALTER TABLE "journeys_users" DROP CONSTRAINT "FK_976a09073749651ca0171e097d9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_659b5a8419cefc2425a4e72676a"`);
        await queryRunner.query(`ALTER TABLE "publishes" DROP CONSTRAINT "FK_e45c4c25571e7fb0a496799b918"`);
        await queryRunner.query(`ALTER TABLE "journeys" DROP CONSTRAINT "FK_6479cea41ce0ce155e8bbb7c85c"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_b58d01f1fc91c865c6b2f283ff0"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b4a0c0cb859704e877cb90247"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54cfa8513fc088102dd7da50e7"`);
        await queryRunner.query(`DROP TABLE "saved_publishes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee316e71a670dca8d696490aee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37fe67a713a33c9385ede5782d"`);
        await queryRunner.query(`DROP TABLE "users_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf20f822139218d27ce09b2ab3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02f1e0bad763fb0d8a938c50c0"`);
        await queryRunner.query(`DROP TABLE "publishes_superpowers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_986a0331069110e7837e897748"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b68be1ead05561c3f94e138c66"`);
        await queryRunner.query(`DROP TABLE "publishes_tags"`);
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
        await queryRunner.query(`DROP TABLE "publishes"`);
        await queryRunner.query(`DROP TABLE "superpowers"`);
        await queryRunner.query(`DROP TABLE "journeys"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
