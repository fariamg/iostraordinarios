import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableComment1716312364449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'body', type: 'text', isNullable: false },
                { name: 'creator_id', type: 'int' },
                { name: 'publish_id', type: 'int' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        }));

        await queryRunner.createForeignKey('comments', new TableForeignKey({
            columnNames: ['creator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('comments', new TableForeignKey({
            columnNames: ['publish_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('comments', 'FK_comments_creator_id');
        await queryRunner.dropForeignKey('comments', 'FK_comments_publish_id');
        await queryRunner.dropTable('comments');
    }

}
