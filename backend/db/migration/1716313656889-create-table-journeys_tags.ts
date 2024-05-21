import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableJourneysTags1716313656889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'journeys_tags',
            columns: [
                { name: 'journeysId', type: 'int', isPrimary: true },
                { name: 'tagsId', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('journeys_tags', new TableForeignKey({
            columnNames: ['journeysId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'journeys',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('journeys_tags', new TableForeignKey({
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('journeys_tags', 'FK_journeysId');
        await queryRunner.dropForeignKey('journeys_tags', 'FK_tagsId');
        await queryRunner.dropTable('journeys_tags');
    }

}
