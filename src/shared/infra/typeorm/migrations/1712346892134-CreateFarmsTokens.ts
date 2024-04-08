import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFarmsTokens1712346892134
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farms_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'farm_id',
            type: 'uuid',
          },
          {
            name: 'expires_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKFarmTokenFarm',
            referencedTableName: 'farms',
            referencedColumnNames: ['id'],
            columnNames: ['farm_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farms_tokens');
  }
}
