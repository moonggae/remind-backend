import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageSoftDelete1689816033878 implements MigrationInterface {
    name = 'ImageSoftDelete1689816033878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`deleted_at\``);
    }
}