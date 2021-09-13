import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'tag',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deals');
  }
}
