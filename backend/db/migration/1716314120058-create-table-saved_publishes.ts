import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableSavedPublishes1716314120058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'saved_publishes',
            columns: [
                { name: 'user_id', type: 'int', isPrimary: true },
                { name: 'publish_id', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('saved_publishes', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('saved_publishes', new TableForeignKey({
            columnNames: ['publish_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishes',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('saved_publishes', 'FK_user_id');
        await queryRunner.dropForeignKey('saved_publishes', 'FK_publish_id');
        await queryRunner.dropTable('saved_publishes');
    }

}
