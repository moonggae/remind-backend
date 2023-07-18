import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTable1688453601525 implements MigrationInterface {
    name = 'GenerateTable1688453601525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mind_tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`display_name\` varchar(20) NOT NULL, \`description\` varchar(400) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card_tag_map\` (\`id\` int NOT NULL AUTO_INCREMENT, \`indicator\` double NULL, \`mind_card_id\` int NOT NULL, \`mind_tag_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mind_card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`displayName\` varchar(20) NOT NULL, \`description\` varchar(400) NULL, \`image_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_60f53fd04c506bea8f2271884d\` (\`name\`), UNIQUE INDEX \`REL_2cd44bd4e13dbc81e9790e428d\` (\`image_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` varchar(36) NOT NULL, \`file_name\` varchar(40) NOT NULL, UNIQUE INDEX \`IDX_d8a2c59e5821d08eaf74411fcd\` (\`file_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(255) NOT NULL, \`loginType\` enum ('KAKAO', 'GOOGLE', 'APPLE') NOT NULL, \`displayName\` varchar(10) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_df955cae05f17b2bcf5045cc02\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` ADD CONSTRAINT \`FK_d04ab284072fa4cc8053f0e0446\` FOREIGN KEY (\`mind_card_id\`) REFERENCES \`mind_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` ADD CONSTRAINT \`FK_1d46886def73343461456471815\` FOREIGN KEY (\`mind_tag_id\`) REFERENCES \`mind_tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_card\` ADD CONSTRAINT \`FK_2cd44bd4e13dbc81e9790e428d1\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_card\` DROP FOREIGN KEY \`FK_2cd44bd4e13dbc81e9790e428d1\``);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` DROP FOREIGN KEY \`FK_1d46886def73343461456471815\``);
        await queryRunner.query(`ALTER TABLE \`card_tag_map\` DROP FOREIGN KEY \`FK_d04ab284072fa4cc8053f0e0446\``);
        await queryRunner.query(`DROP INDEX \`IDX_df955cae05f17b2bcf5045cc02\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8a2c59e5821d08eaf74411fcd\` ON \`image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP INDEX \`REL_2cd44bd4e13dbc81e9790e428d\` ON \`mind_card\``);
        await queryRunner.query(`DROP INDEX \`IDX_60f53fd04c506bea8f2271884d\` ON \`mind_card\``);
        await queryRunner.query(`DROP TABLE \`mind_card\``);
        await queryRunner.query(`DROP TABLE \`card_tag_map\``);
        await queryRunner.query(`DROP TABLE \`mind_tag\``);
    }

}
