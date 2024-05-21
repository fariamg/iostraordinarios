import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableLike1716312382923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'likes',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'type', type: 'enum', enum: ['like', 'claps', 'heart', 'smile'], default: "'like'" },
                { name: 'user_id', type: 'int' },
                { name: 'publish_id', type: 'int' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        }));

        await queryRunner.createForeignKey('likes', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('likes', new TableForeignKey({
            columnNames: ['publish_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('likes', 'FK_likes_user_id');
        await queryRunner.dropForeignKey('likes', 'FK_likes_publish_id');
        await queryRunner.dropTable('likes');
    }

}
