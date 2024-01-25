import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsersTokens1706191440234
  implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users_tokens',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'refresh_token',
              type: 'varchar',
            },
            {
              name: 'user_id',
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
            }
          ],
          foreignKeys: [
            {
              name: 'FKUserUserToken',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            },
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users_tokens')
    }
}
