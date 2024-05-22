import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddFemaleAndMaleToScores1716398717526
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'scores',
      [
        new TableColumn({
          name: 'female',
          type: 'varchar',
          isNullable: true,
        }),
        new TableColumn({
          name: 'male',
          type: 'varchar',
          isNullable: true,
        }),
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('scores', ['female', 'male']);
  }
}
