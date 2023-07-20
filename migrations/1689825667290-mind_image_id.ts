import { MigrationInterface, QueryRunner } from "typeorm";

export class MindImageId1689825667290 implements MigrationInterface {
    name = 'MindImageId1689825667290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` ADD \`image_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` ADD CONSTRAINT \`FK_abb4353e35e04b543307e134f64\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` DROP FOREIGN KEY \`FK_abb4353e35e04b543307e134f64\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` DROP COLUMN \`image_id\``);
    }

}
