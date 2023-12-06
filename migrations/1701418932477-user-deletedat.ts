import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDeletedAt1701418932477 implements MigrationInterface {
    name = 'UserDeletedAt1701418932477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
    }

}
