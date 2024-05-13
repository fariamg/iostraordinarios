import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInSuperpower1715564426014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO superpowers (name, description, created_at, updated_at)
                VALUES
                ('As maravilhosas asas para inovar', 'Descrição não especificada.', NOW(), NOW()),
                ('O impenetrável escudo do cuidado', 'Descrição não especificada.', NOW(), NOW()),
                ('O incrível cristal do extraordinário', 'Descrição não especificada.', NOW(), NOW()),
                ('O poder infinito da mente', 'Descrição não especificada.', NOW(), NOW()),
                ('A varinha mágica da transformação', 'Descrição não especificada.', NOW(), NOW()),
                ('O indestrutível laço da evolução', 'Descrição não especificada.', NOW(), NOW()),
                ('A fabulosa flecha da agilidade', 'Descrição não especificada.', NOW(), NOW());
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM superpowers`);
    }
}
