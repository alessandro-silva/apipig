import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddEmailToProducers1712699670656
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'producers',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('producers', 'email');
  }
}
