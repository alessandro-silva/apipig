import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddGenderToMarkings1716381208415
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'markings',
      new TableColumn({
        name: 'gender',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('markings', 'gender');
  }
}
