import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenants1638963391898 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'AddTenants1638963391898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "public"."tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_a920abe6f6dd7764ee0f8108f57" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "public"."tenants"');
  }
}
