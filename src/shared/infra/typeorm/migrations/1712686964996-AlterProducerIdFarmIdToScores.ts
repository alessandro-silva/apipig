import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProducerIdFarmIdToScores1712686964996
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'FKScoreProducer');
    await queryRunner.dropForeignKey('scores', 'FKScoreFarm');
    await queryRunner.changeColumn(
      'scores',
      'producer_id',
      new TableColumn({
        name: 'producer_id_sender',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'scores',
      'farm_id',
      new TableColumn({
        name: 'farm_id_sender',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.addColumns(
      'scores',
      [
        new TableColumn({
          name: 'producer_id_received',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'farm_id_received',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'producer_id_internal',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'farm_id_internal',
          type: 'uuid',
          isNullable: true,
        }),
      ],
    );
    await queryRunner.createForeignKeys(
      'scores',
      [
        new TableForeignKey({
          name: 'FKScoreProducerSender',
          referencedTableName: 'producers',
          referencedColumnNames: ['id'],
          columnNames: ['producer_id_sender'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        new TableForeignKey({
          name: 'FKScoreFarmSender',
          referencedTableName: 'farms',
          referencedColumnNames: ['id'],
          columnNames: ['farm_id_sender'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        new TableForeignKey({
          name: 'FKScoreProducerReceived',
          referencedTableName: 'producers',
          referencedColumnNames: ['id'],
          columnNames: ['producer_id_received'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        new TableForeignKey({
          name: 'FKScoreFarmReceived',
          referencedTableName: 'farms',
          referencedColumnNames: ['id'],
          columnNames: ['farm_id_received'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        new TableForeignKey({
          name: 'FKScoreProducerInternal',
          referencedTableName: 'producers',
          referencedColumnNames: ['id'],
          columnNames: ['producer_id_internal'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        new TableForeignKey({
          name: 'FKScoreFarmInternal',
          referencedTableName: 'farms',
          referencedColumnNames: ['id'],
          columnNames: ['farm_id_internal'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('scores', 'FKScoreProducerSender');
    await queryRunner.dropForeignKey('scores', 'FKScoreFarmSender');
    await queryRunner.dropForeignKey('scores', 'FKScoreProducerReceived');
    await queryRunner.dropForeignKey('scores', 'FKScoreFarmReceived');
    await queryRunner.dropForeignKey('scores', 'FKScoreProducerInternal');
    await queryRunner.dropForeignKey('scores', 'FKScoreFarmInternal');
    await queryRunner.dropColumns(
      'scores',
      [
        'producer_id_sender',
        'farm_id_sender',
        'producer_id_received',
        'farm_id_received',
        'producer_id_internal',
        'farm_id_internal',
      ])
  }
}
