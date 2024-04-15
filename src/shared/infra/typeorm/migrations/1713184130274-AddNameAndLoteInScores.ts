import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddNameAndLoteInScores1713184130274
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'scores',
      [
        new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: true,
        }),
        new TableColumn({
          name: 'lote',
          type: 'varchar',
          isNullable: true,
        }),
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('scores', ['name', 'lote']);
  }
}
