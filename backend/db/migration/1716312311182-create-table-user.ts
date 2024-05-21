import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableUser1716312311182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'full_name', type: 'varchar' },
                { name: 'password', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'position', type: 'varchar' },
                { name: 'role', type: 'enum', enum: ['admin', 'leader', 'user'], default: "'user'" },
                { name: 'nuts', type: 'int', default: 0 },
                { name: 'bio', type: 'text', default: "'Olá, estou usando o app Ioasys Journey'" },
                { name: 'avatar', type: 'varchar', isNullable: true },
                { name: 'interactions_count', type: 'int', default: 0 },
                { name: 'missions_completed', type: 'int', default: 0 },
                { name: 'score', type: 'int', default: 0 },
                { name: 'publishes_count', type: 'int', default: 0 },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'superpowerId', type: 'int', isNullable: true }
            ]
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['superpowerId'], 
            referencedColumnNames: ['id'],
            referencedTableName: 'superpowers',
            onDelete: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'FK_superpowerId'); 
        await queryRunner.dropTable('users');
    }
}
