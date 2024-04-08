import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddTypeAndNfeAndFarmIdToScores1712596440670
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'scores',
      [
        new TableColumn({
          name: 'type',
          type: 'varchar',
          isNullable: true,
        }),
        new TableColumn({
          name: 'nfe',
          type: 'varchar',
          isNullable: true,
        }),
        new TableColumn({
          name: 'farm_id',
          type: 'uuid',
          isNullable: true,
        }),
      ]
    );

    await queryRunner.createForeignKey(
      'scores',
      new TableForeignKey({
        name: 'FKScoreFarm',
        referencedTableName: 'farms',
        referencedColumnNames: ['id'],
        columnNames: ['farm_id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'FKScoreFarm');

    await queryRunner.dropColumns('scores', ['type', 'nfe', 'farm_id']);
  }
}
