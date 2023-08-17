import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCommentUpdatedAt1692253504303 implements MigrationInterface {
    name = 'DeleteCommentUpdatedAt1692253504303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` DROP COLUMN \`updated_at\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mind_post_memo_comment\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

}
