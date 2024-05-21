import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTablePublish1716312325593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'publishes',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'title', type: 'varchar', length: '500' },
                { name: 'description', type: 'varchar', length: '2000' },
                { name: 'likes_count', type: 'int', default: 0 },
                { name: 'creator_id', type: 'int' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }
            ]
        }));

        await queryRunner.createForeignKey('publishes', new TableForeignKey({
            columnNames: ['creator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('publishes', 'FK_creator_id');
        await queryRunner.dropTable('publishes');
    }

}
