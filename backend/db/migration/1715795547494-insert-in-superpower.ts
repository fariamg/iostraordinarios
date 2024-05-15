import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInSuperpower1715794997870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO superpowers (name) VALUES
            ('O impenetrável escudo do cuidado'),
            ('O incrível cristal do extraordinário'),
            ('O poder infinito da mente'),
            ('A varinha mágica da transformação'),
            ('O indestrutível laço da evolução'),
            ('As maravilhosas asas para inovar'),
            ('A fabulosa flecha da agilidade');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM superpowers;
        `);
    }

}
