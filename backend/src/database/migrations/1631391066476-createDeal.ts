import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createDeal1631391066476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            // ref
            name: 'pipeline',
            type: 'uuid',
          },
          {
            // ref
            name: 'company',
            type: 'uuid',
          },
          {
            // ref
            name: 'contact',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['DONE', 'LOST', 'INPROGRESS', 'ARCHIVED'],
            default: `'INPROGRESS'`,
          },
          {
            name: 'activity',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'deals',
      new TableForeignKey({
        columnNames: ['pipeline'],
        referencedTableName: 'pipelines',
        referencedColumnNames: ['id']
      })
    );

    await queryRunner.createForeignKey(
      'deals',
      new TableForeignKey({
        columnNames: ['company'],
        referencedTableName: 'companies',
        referencedColumnNames: ['id']
      })
    );

    await queryRunner.createForeignKey(
      'deals',
      new TableForeignKey({
        columnNames: ['contact'],
        referencedTableName: 'contacts',
        referencedColumnNames: ['id']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deals');
  }
}
