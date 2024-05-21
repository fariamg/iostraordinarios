import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableUsersTags1716313608081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_tags',
            columns: [
                { name: 'user_id', type: 'int', isPrimary: true },
                { name: 'tag_id', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('users_tags', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('users_tags', new TableForeignKey({
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_tags', 'FK_user_id');
        await queryRunner.dropForeignKey('users_tags', 'FK_tag_id');
        await queryRunner.dropTable('users_tags');
    }

}
