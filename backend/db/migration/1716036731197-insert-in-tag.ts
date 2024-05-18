import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInTag1716036731197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO tags (name) VALUES
                ('Transformar'),
                ('Cuidar'),
                ('Diversificar'),
                ('Respeitar'),
                ('Produzir bem'),
                ('Criatividade'),
                ('Inovação'),
                ('Excelência'),
                ('Reconhecimento'),
                ('Surpreender'),
                ('Novidade'),
                ('Expansão'),
                ('Manutenção'),
                ('Agilidade'),
                ('Comportamento'),
                ('Transparência'),
                ('Expectativas x Restrições'),
                ('Desenvolvimento pessoal'),
                ('Softskills'),
                ('Aprendizado contínuo'),
                ('Evolução'),
                ('Mercado'),
                ('Constância'),
                ('Diálogo'),
                ('Compartilhar');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM tags WHERE name IN (
                'Transformar',
                'Cuidar',
                'Diversificar',
                'Respeitar',
                'Produzir bem',
                'Criatividade',
                'Inovação',
                'Excelência',
                'Reconhecimento',
                'Surpreender',
                'Novidade',
                'Expansão',
                'Manutenção',
                'Agilidade',
                'Comportamento',
                'Transparência',
                'Expectativas x Restrições',
                'Desenvolvimento pessoal',
                'Softskills',
                'Aprendizado contínuo',
                'Evolução',
                'Mercado',
                'Constância',
                'Diálogo',
                'Compartilhar'
            );
            `);
    }

}
