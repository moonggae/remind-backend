import { User } from "src/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInviteCodeToUser1694753717518 implements MigrationInterface {
    name = 'AddInviteCodeToUser1694753717518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`inviteCode\` char(6) NULL`);
        const userRepository = await queryRunner.connection.getRepository(User)
        const userEntities = await userRepository.find()

        for (var i = 0; i < userEntities.length; i++) {
            const user = userEntities[i];
            let isCodeConflict = false;
            do {
                const randomCode = Math.random().toString(10).substring(2, 8);
                isCodeConflict = userEntities.some(item => item.inviteCode == randomCode);
                if (isCodeConflict == false) {
                    user.inviteCode = randomCode;
                    await userRepository.save(user);
                    break;
                }
            } while (isCodeConflict);
        }

        await queryRunner.query(`ALTER TABLE \`user\` MODIFY \`inviteCode\` char(6) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`inviteCode\``);
    }

}
