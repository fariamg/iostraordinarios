import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSuperpower1716312294109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'superpowers',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', length: '500' },
                { name: 'total_score', type: 'int', default: 0 }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('superpowers');
    }

}
