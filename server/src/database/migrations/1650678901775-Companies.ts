import {MigrationInterface, QueryRunner} from "typeorm";

export class Companies1650678901775 implements MigrationInterface {
    name = 'Companies1650678901775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clinics" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cnpj" character varying(14) NOT NULL, "address" jsonb NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clinics"`);
    }

}
