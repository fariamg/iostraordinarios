import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInPublish1716331247590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO publishes (title, description, likes_count, creator_id, created_at, updated_at)
            VALUES
                ('Iniciativa de Reestruturação', 'Recentemente, participei de um projeto que envolveu a reestruturação de alguns dos nossos processos e, utilizando princípios de inovação, propusemos uma abordagem totalmente nova, focada na personalização e na experiência do cliente. Apresentamos um plano que não apenas solucionou nosso problema, mas também melhorou a satisfação do cliente e aumentou a eficiência operacional. Foi gratificante ver como a busca por novas ideias e soluções trouxe resultados tangíveis para a empresa.', 0, (SELECT id FROM users WHERE email = 'gustavo.pereira@ioasys.com'), NOW(), NOW()),
                ('Recomendo Livro de Design', 'Oi pessoal! Hoje vim aqui para indicar o livro "Designer para quem não é designer", terminei a obra recentemente e percebi que acompanhar as tendências do mercado é uma forma de entender a relação do design com o desenvolvimento, melhorando a integração entre os colaboradores, pois existem alguns conceitos que são fundamentais para produzir soluções eficazes e de qualidade. Recomendo super!', 0, (SELECT id FROM users WHERE email = 'bruno.costa@ioasys.com'), NOW(), NOW()),
                ('Iniciativa Inspiradora', 'Compartilhando uma iniciativa inspiradora! Como Scrum Master, acredito no poder da diversidade, do respeito e da agilidade para impulsionar a expansão e o crescimento de equipes e comunidades e, para colocar essas crenças em prática, topei participar de um projeto voluntário com uma equipe multidisciplinar e variada, colaboramos para desenvolver esse produto final sem quaisquer fins lucrativos para essa instituição e o resultado é muito gratificante! Logo trarei atualizações e demonstrações do nosso trabalho.', 0, (SELECT id FROM users WHERE email = 'helena.rocha@ioasys.com'), NOW(), NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM publishes WHERE title IN (
                'Iniciativa de Reestruturação',
                'Recomendo Livro de Design',
                'Iniciativa Inspiradora'
            );
        `);
    }

}
