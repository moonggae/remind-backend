import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileImage1693743560916 implements MigrationInterface {
    name = 'UserProfileImage1693743560916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profile_image_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_938b0dfbabed6deaa4a9a91e919\` FOREIGN KEY (\`profile_image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_938b0dfbabed6deaa4a9a91e919\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profile_image_id\``);
    }

}
