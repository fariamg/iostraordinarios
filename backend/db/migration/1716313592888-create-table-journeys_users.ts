import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableJourneysUsers1716313592888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'journeys_users',
            columns: [
                { name: 'journeysId', type: 'int', isPrimary: true },
                { name: 'UsersID', type: 'int', isPrimary: true },
                { name: 'completed', type: 'boolean', default: false },
                { name: 'completedAt', type: 'timestamp', isNullable: true }
            ]
        }));

        await queryRunner.createForeignKey('journeys_users', new TableForeignKey({
            columnNames: ['journeysId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'journeys',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('journeys_users', new TableForeignKey({
            columnNames: ['UsersID'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('journeys_users', 'FK_journeysId');
        await queryRunner.dropForeignKey('journeys_users', 'FK_UsersID');
        await queryRunner.dropTable('journeys_users');
    }

}
