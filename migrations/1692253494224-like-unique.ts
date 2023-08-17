import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeUnique1692253494224 implements MigrationInterface {
    name = 'LikeUnique1692253494224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cf8d8bb884238d3ac6f7abb106\` ON \`mind_post_memo_comment_like\` (\`user_id\`, \`comment_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cf8d8bb884238d3ac6f7abb106\` ON \`mind_post_memo_comment_like\``);
    }

}
