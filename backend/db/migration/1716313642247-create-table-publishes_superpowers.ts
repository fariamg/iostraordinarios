import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTablePublishesSuperpowers1716313642247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'publishes_superpowers',
            columns: [
                { name: 'publishesId', type: 'int', isPrimary: true },
                { name: 'superpowersId', type: 'int', isPrimary: true }
            ]
        }));

        await queryRunner.createForeignKey('publishes_superpowers', new TableForeignKey({
            columnNames: ['publishesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'publishes',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('publishes_superpowers', new TableForeignKey({
            columnNames: ['superpowersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'superpowers',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('publishes_superpowers', 'FK_publishesId');
        await queryRunner.dropForeignKey('publishes_superpowers', 'FK_superpower_id');
        await queryRunner.dropTable('publishes_superpowers');
    }

}
