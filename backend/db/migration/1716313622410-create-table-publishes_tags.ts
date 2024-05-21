import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTablePublishesTags1716313622410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'publishes_tags',
            columns: [
                { name: 'publishesId', type: 'int', isPrimary: true },
                { name: 'tagsId', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('publishes_tags', new TableForeignKey({
            columnNames: ['publishesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishes',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('publishes_tags', new TableForeignKey({
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('publishes_tags', 'FK_publish_id');
        await queryRunner.dropForeignKey('publishes_tags', 'FK_tag_id');
        await queryRunner.dropTable('publishes_tags');
    }

}
