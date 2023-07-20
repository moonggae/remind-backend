import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTable1688453601525 implements MigrationInterface {
    name = 'GenerateTable1688453601525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`file_name\` varchar(40) NOT NULL, UNIQUE INDEX \`IDX_d8a2c59e5821d08eaf74411fcd\` (\`file_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`uid\` varchar(255) NOT NULL, \`loginType\` enum ('KAKAO', 'GOOGLE', 'APPLE') NOT NULL, \`displayName\` varchar(10) NULL, UNIQUE INDEX \`IDX_df955cae05f17b2bcf5045cc02\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`display_name\` varchar(20) NOT NULL, \`description\` varchar(400) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card_tag_map\` (\`id\` int NOT NULL AUTO_INCREMENT, \`indicator\` double NULL, \`mind_card_id\` int NOT NULL, \`mind_tag_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`displayName\` varchar(20) NOT NULL, \`description\` varchar(400) NULL, \`image_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_60f53fd04c506bea8f2271884d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo_comment_like\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NOT NULL, \`comment_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo_comment\` (\`deleted_at\` timestamp(6) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(1000) NOT NULL, \`memo_id\` int NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_memo\` (\`deleted_at\` timestamp(6) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(1000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_image\` (\`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`image_id\` varchar(36) NOT NULL, \`post_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post\` (\`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NOT NULL, \`memo_id\` int NULL, UNIQUE INDEX \`REL_07481d3154f337171c36e0d29c\` (\`memo_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_post_card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('MAIN', 'SUB') NOT NULL, \`post_id\` int NOT NULL, \`card_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` ADD CONSTRAINT \`FK_d04ab284072fa4cc8053f0e0446\` FOREIGN KEY (\`mind_card_id\`) REFERENCES \`mind_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` ADD CONSTRAINT \`FK_1d46886def73343461456471815\` FOREIGN KEY (\`mind_tag_id\`) REFERENCES \`mind_tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_card\` ADD CONSTRAINT \`FK_2cd44bd4e13dbc81e9790e428d1\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` ADD CONSTRAINT \`FK_290efbf1e26e31dffd993df8418\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` ADD CONSTRAINT \`FK_53093aa303b0e31bf62279d2956\` FOREIGN KEY (\`comment_id\`) REFERENCES \`mind_post_memo_comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` ADD CONSTRAINT \`FK_87408e9cd14668ad73d9e7b9d85\` FOREIGN KEY (\`memo_id\`) REFERENCES \`mind_post_memo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` ADD CONSTRAINT \`FK_806c91ea688288e25937ceea1af\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` ADD CONSTRAINT \`FK_abb4353e35e04b543307e134f64\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` ADD CONSTRAINT \`FK_cf8c4c29b0dcf5afa8ca1ebb05c\` FOREIGN KEY (\`post_id\`) REFERENCES \`mind_post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post\` ADD CONSTRAINT \`FK_43e278cd691b26cbd3995fc360a\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post\` ADD CONSTRAINT \`FK_07481d3154f337171c36e0d29cb\` FOREIGN KEY (\`memo_id\`) REFERENCES \`mind_post_memo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` ADD CONSTRAINT \`FK_825f375659494a516217ef2991c\` FOREIGN KEY (\`post_id\`) REFERENCES \`mind_post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` ADD CONSTRAINT \`FK_dbf468ade9d5e1fb3483e109045\` FOREIGN KEY (\`card_id\`) REFERENCES \`mind_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` DROP FOREIGN KEY \`FK_dbf468ade9d5e1fb3483e109045\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_card\` DROP FOREIGN KEY \`FK_825f375659494a516217ef2991c\``);
        await queryRunner.query(`ALTER TABLE \`mind_post\` DROP FOREIGN KEY \`FK_07481d3154f337171c36e0d29cb\``);
        await queryRunner.query(`ALTER TABLE \`mind_post\` DROP FOREIGN KEY \`FK_43e278cd691b26cbd3995fc360a\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` DROP FOREIGN KEY \`FK_cf8c4c29b0dcf5afa8ca1ebb05c\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_image\` DROP FOREIGN KEY \`FK_abb4353e35e04b543307e134f64\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` DROP FOREIGN KEY \`FK_806c91ea688288e25937ceea1af\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` DROP FOREIGN KEY \`FK_87408e9cd14668ad73d9e7b9d85\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` DROP FOREIGN KEY \`FK_53093aa303b0e31bf62279d2956\``);
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment_like\` DROP FOREIGN KEY \`FK_290efbf1e26e31dffd993df8418\``);
        await queryRunner.query(`ALTER TABLE \`mind_card\` DROP FOREIGN KEY \`FK_2cd44bd4e13dbc81e9790e428d1\``);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` DROP FOREIGN KEY \`FK_1d46886def73343461456471815\``);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` DROP FOREIGN KEY \`FK_d04ab284072fa4cc8053f0e0446\``);
        await queryRunner.query(`DROP TABLE \`mind_post_card\``);
        await queryRunner.query(`DROP INDEX \`REL_07481d3154f337171c36e0d29c\` ON \`mind_post\``);
        await queryRunner.query(`DROP TABLE \`mind_post\``);
        await queryRunner.query(`DROP TABLE \`mind_post_image\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo_comment\``);
        await queryRunner.query(`DROP TABLE \`mind_post_memo_comment_like\``);
        await queryRunner.query(`DROP INDEX \`IDX_60f53fd04c506bea8f2271884d\` ON \`mind_card\``);
        await queryRunner.query(`DROP TABLE \`mind_card\``);
        await queryRunner.query(`DROP TABLE \`card_tag_map\``);
        await queryRunner.query(`DROP TABLE \`mind_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_df955cae05f17b2bcf5045cc02\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8a2c59e5821d08eaf74411fcd\` ON \`image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
