import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserUidUnique1701850252163 implements MigrationInterface {
    name = 'RemoveUserUidUnique1701850252163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_df955cae05f17b2bcf5045cc02\` ON \`user\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_df955cae05f17b2bcf5045cc02\` ON \`user\` (\`uid\`)`);
    }

}
