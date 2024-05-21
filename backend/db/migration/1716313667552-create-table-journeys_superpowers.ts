import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableJourneysSuperpowers1716313667552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'journeys_superpowers',
            columns: [
                { name: 'journeysId', type: 'int', isPrimary: true },
                { name: 'superpowersId', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('journeys_superpowers', new TableForeignKey({
            columnNames: ['journeysId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'journeys',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('journeys_superpowers', new TableForeignKey({
            columnNames: ['superpowersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'superpowers',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('journeys_superpowers', 'FK_journeysId');
        await queryRunner.dropForeignKey('journeys_superpowers', 'FK_superpowersId');
        await queryRunner.dropTable('journeys_superpowers');
    }

}
