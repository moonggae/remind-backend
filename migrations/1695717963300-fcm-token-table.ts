import { MigrationInterface, QueryRunner } from "typeorm";

export class FCMTokenTable1695717963300 implements MigrationInterface {
    name = 'FCMTokenTable1695717963300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_fcm_token\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_fcm_token\` ADD CONSTRAINT \`FK_b212aff419400432e231f4b60d9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_fcm_token\` DROP FOREIGN KEY \`FK_b212aff419400432e231f4b60d9\``);
        await queryRunner.query(`DROP TABLE \`user_fcm_token\``);
    }

}
