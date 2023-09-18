import { MigrationInterface, QueryRunner } from "typeorm";

export class Friend1694765999429 implements MigrationInterface {
    name = 'Friend1694765999429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`friend_request\` (\`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`request_user_id\` varchar(36) NOT NULL, \`receive_user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend\` (\`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`friend_request_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`friend_request\` ADD CONSTRAINT \`FK_80e60a491a4aa83ff61310b3d87\` FOREIGN KEY (\`request_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_request\` ADD CONSTRAINT \`FK_42dd6986e287b11c2710b44ce25\` FOREIGN KEY (\`receive_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend\` ADD CONSTRAINT \`FK_11acc617fef39af0eef3eb662ef\` FOREIGN KEY (\`friend_request_id\`) REFERENCES \`friend_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friend\` DROP FOREIGN KEY \`FK_11acc617fef39af0eef3eb662ef\``);
        await queryRunner.query(`ALTER TABLE \`friend_request\` DROP FOREIGN KEY \`FK_42dd6986e287b11c2710b44ce25\``);
        await queryRunner.query(`ALTER TABLE \`friend_request\` DROP FOREIGN KEY \`FK_80e60a491a4aa83ff61310b3d87\``);
        await queryRunner.query(`DROP TABLE \`friend\``);
        await queryRunner.query(`DROP TABLE \`friend_request\``);
    }

}
