import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInUser1716318735062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (full_name, password, email, position, role, nuts, bio, avatar, interactions_count, missions_completed, score, publishes_count, "superpowerId", created_at, updated_at)
            VALUES
                ('Alice Silva', 'hashedpassword1', 'alice.silva@ioasys.com', 'Desenvolvedor back-end', 'user', 150, 'Olá, sou a Alice', NULL, 25, 2, 120, 5, 1, NOW(), NOW()),
                ('Bruno Costa', 'hashedpassword2', 'bruno.costa@ioasys.com', 'Desenvolvedor front-end', 'user', 180, 'Olá, sou o Bruno', NULL, 30, 3, 140, 4, 2, NOW(), NOW()),
                ('Carla Mendes', 'hashedpassword3', 'carla.mendes@ioasys.com', 'Designer', 'user', 200, 'Olá, sou a Carla', NULL, 40, 4, 160, 3, 3, NOW(), NOW()),
                ('Diego Lima', 'hashedpassword4', 'diego.lima@ioasys.com', 'Desenvolvedor mobile', 'user', 220, 'Olá, sou o Diego', NULL, 50, 5, 180, 2, 4, NOW(), NOW()),
                ('Evelyn Martins', 'hashedpassword5', 'evelyn.martins@ioasys.com', 'QA', 'user', 250, 'Olá, sou a Evelyn', NULL, 60, 6, 200, 1, 5, NOW(), NOW()),
                ('Fernanda Oliveira', 'hashedpassword6', 'fernanda.oliveira@ioasys.com', 'Gerente de projeto', 'leader', 300, 'Olá, sou a Fernanda', NULL, 70, 7, 220, 1, 6, NOW(), NOW()),
                ('Gustavo Pereira', 'hashedpassword7', 'gustavo.pereira@ioasys.com', 'Scrum Master', 'leader', 350, 'Olá, sou o Gustavo', NULL, 80, 8, 240, 2, 7, NOW(), NOW()),
                ('Helena Rocha', 'hashedpassword8', 'helena.rocha@ioasys.com', 'Líder técnico', 'leader', 400, 'Olá, sou a Helena', NULL, 90, 9, 260, 3, 1, NOW(), NOW()),
                ('Igor Santos', 'hashedpassword9', 'igor.santos@ioasys.com', 'CTO', 'admin', 500, 'Olá, sou o Igor', NULL, 100, 10, 300, 4, 2, NOW(), NOW())
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM users WHERE email IN (
            'alice.silva@ioasys.com',
            'bruno.costa@ioasys.com',
            'carla.mendes@ioasys.com',
            'diego.lima@ioasys.com',
            'evelyn.martins@ioasys.com',
            'fernanda.oliveira@ioasys.com',
            'gustavo.pereira@ioasys.com',
            'helena.rocha@ioasys.com',
            'igor.santos@ioasys.com'
        );
    `);
    }

}
