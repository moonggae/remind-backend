import { MigrationInterface, QueryRunner } from "typeorm";

export class MindCardBookmarkTable1697518593092 implements MigrationInterface {
    name = 'MindCardBookmarkTable1697518593092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mind_card_bookmark\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NOT NULL, \`mind_card_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mind_card_bookmark\` ADD CONSTRAINT \`FK_84e0696c5779d35528ff4abdfba\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mind_card_bookmark\` ADD CONSTRAINT \`FK_3ca8f34a32745607fe0aff3261b\` FOREIGN KEY (\`mind_card_id\`) REFERENCES \`mind_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_card_bookmark\` DROP FOREIGN KEY \`FK_3ca8f34a32745607fe0aff3261b\``);
        await queryRunner.query(`ALTER TABLE \`mind_card_bookmark\` DROP FOREIGN KEY \`FK_84e0696c5779d35528ff4abdfba\``);
        await queryRunner.query(`DROP TABLE \`mind_card_bookmark\``);
    }
}