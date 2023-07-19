import { MigrationInterface, QueryRunner } from "typeorm";

export class MindPost1689751388355 implements MigrationInterface {
    name = 'MindPost1689751388355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mind_post_card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('0', '1') NOT NULL, \`post_id\` int NOT NULL, \`card_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(1000) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`memo_id\` int NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(1000) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`user_id\` varchar(36) NOT NULL, \`memo_id\` int NULL, UNIQUE INDEX \`REL_07481d3154f337171c36e0d29c\` (\`memo_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`post_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo_comment_like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NOT NULL, \`comment_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` ADD CONSTRAINT \`FK_825f375659494a516217ef2991c\` FOREIGN KEY (\`post_id\`) REFERENCES \`mind_post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` ADD CONSTRAINT \`FK_dbf468ade9d5e1fb3483e109045\` FOREIGN KEY (\`card_id\`) REFERENCES \`mind_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` ADD CONSTRAINT \`FK_87408e9cd14668ad73d9e7b9d85\` FOREIGN KEY (\`memo_id\`) REFERENCES \`mind_post_memo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` ADD CONSTRAINT \`FK_806c91ea688288e25937ceea1af\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post\` ADD CONSTRAINT \`FK_43e278cd691b26cbd3995fc360a\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post\` ADD CONSTRAINT \`FK_07481d3154f337171c36e0d29cb\` FOREIGN KEY (\`memo_id\`) REFERENCES \`mind_post_memo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` ADD CONSTRAINT \`FK_cf8c4c29b0dcf5afa8ca1ebb05c\` FOREIGN KEY (\`post_id\`) REFERENCES \`mind_post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` ADD CONSTRAINT \`FK_290efbf1e26e31dffd993df8418\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` ADD CONSTRAINT \`FK_53093aa303b0e31bf62279d2956\` FOREIGN KEY (\`comment_id\`) REFERENCES \`mind_post_memo_comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` DROP FOREIGN KEY \`FK_53093aa303b0e31bf62279d2956\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` DROP FOREIGN KEY \`FK_290efbf1e26e31dffd993df8418\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` DROP FOREIGN KEY \`FK_cf8c4c29b0dcf5afa8ca1ebb05c\``);
        await queryRunner.query(`ALTER TABLE \`mind_post\` DROP FOREIGN KEY \`FK_07481d3154f337171c36e0d29cb\``);
        await queryRunner.query(`ALTER TABLE \`mind_post\` DROP FOREIGN KEY \`FK_43e278cd691b26cbd3995fc360a\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` DROP FOREIGN KEY \`FK_806c91ea688288e25937ceea1af\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` DROP FOREIGN KEY \`FK_87408e9cd14668ad73d9e7b9d85\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` DROP FOREIGN KEY \`FK_dbf468ade9d5e1fb3483e109045\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` DROP FOREIGN KEY \`FK_825f375659494a516217ef2991c\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo_comment_like\``);
        await queryRunner.query(`DROP TABLE \`mind_post_image\``);
        await queryRunner.query(`DROP INDEX \`REL_07481d3154f337171c36e0d29c\` ON \`mind_post\``);
        await queryRunner.query(`DROP TABLE \`mind_post\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo_comment\``);
        await queryRunner.query(`DROP TABLE \`mind_post_card\``);
    }

}
