import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateFarms1712329996550
  implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'farms',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'nickname',
              type: 'varchar',
            },
            {
              name: 'status',
              type: 'boolean',
              default: true,
            },
            {
              name: 'producer_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'FKFarmProducer',
              columnNames: ['producer_id'],
              referencedTableName: 'producers',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('farms');
    }
}
