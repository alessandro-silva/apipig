import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddProgressToScores1713318806519
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'scores',
      new TableColumn({
        name: 'progress',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('scores', 'progress');
  }
}
