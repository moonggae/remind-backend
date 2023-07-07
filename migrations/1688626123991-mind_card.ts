import { Image } from "src/image/entities/image.entity"
import { MindCard } from "src/mind/card/entities/mind-card.entity"
import { MigrationInterface, QueryRunner } from "typeorm"

export class MindCard1688626123991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const imageRepo = queryRunner.connection.getRepository(Image)
        const cardRepo = queryRunner.connection.getRepository(MindCard)

        const imageEntities = await imageRepo.find()

        for (var index in imageEntities) {
            const image = imageEntities[index]
            let displayName: string = '';
            switch (image.fileName) {
                case 'Angry.svg':
                    displayName = '화난'
                    break
                case 'Anxious.svg':
                    displayName = '불안'
                    break
                case 'Apathetic.svg':
                    displayName = '냉담한'
                    break
                case 'Bored.svg':
                    displayName = '지루한'
                    break
                case 'Calm.svg':
                    displayName = '평온한'
                    break
                case 'Concerned.svg':
                    displayName = '걱정'
                    break
                case 'Depressed.svg':
                    displayName = '우울한'
                    break
                case 'Desolate.svg':
                    displayName = '고독한'
                    break
                case 'Disappointed.svg':
                    displayName = '실망'
                    break
                case 'Exhilarated.svg':
                    displayName = '아주 신나는'
                    break
                case 'Fatigued.svg':
                    displayName = '지친'
                    break
                case 'Fluttering.svg':
                    displayName = '설레는'
                    break
                case 'Frightened.svg':
                    displayName = '겁먹은'
                    break
                case 'Happy.svg':
                    displayName = '행복한'
                    break
                case 'Hopeful.svg':
                    displayName = '희망 찬'
                    break
                case 'Hyper.svg':
                    displayName = '들뜬'
                    break
                case 'Irritated.svg':
                    displayName = '짜증'
                    break
                case 'Joyful.svg':
                    displayName = '기쁜'
                    break
                case 'Numbing.svg':
                    displayName = '무감각한'
                    break
                case 'Playful.svg':
                    displayName = '재미있는'
                    break
                case 'Pleased.svg':
                    displayName = '만족스러운'
                    break
                case 'Restful.svg':
                    displayName = '편안한'
                    break
                case 'Sad.svg':
                    displayName = '슬픈'
                    break
                case 'Satisfied.svg':
                    displayName = '만족스러운'
                    break
                case 'Shocked.svg':
                    displayName = '충격'
                    break
                case 'Surprised.svg':
                    displayName = '놀란'
                    break
                case 'Thrilled.svg':
                    displayName = '짜릿한'
                    break
                case 'Tired.svg':
                    displayName = '피곤한'
                    break
                case 'Touched.svg':
                    displayName = '감동적인'
                    break
                default:
            }

            const card = cardRepo.create({ imageFile: image, name: image.fileName.split('.')[0], displayName: displayName })
            await cardRepo.save(card)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const cardRepo = queryRunner.connection.getRepository(MindCard)
        await cardRepo.clear()
    }

}
