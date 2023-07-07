import { MindTag } from "src/mind/tag/entities/mind-tag.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class MindTag1688453601526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tagRepo = queryRunner.connection.getRepository(MindTag);

        await tagRepo.insert({
            name: 'energy',
            displayName: '활력',
            description: '활력'
        })

        await tagRepo.insert({
            name: 'pleasantness',
            displayName: '쾌적함',
            description: '쾌적함'
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tagRepo = queryRunner.connection.getRepository(MindTag);
        await tagRepo.clear()
    }

}
