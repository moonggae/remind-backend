import { CardTagMap } from "src/mind/card-tag-map/entities/card-tag-map.entity"
import { MindCard } from "src/mind/card/entities/mind-card.entity"
import { MindTag } from "src/mind/tag/entities/mind-tag.entity"
import { MigrationInterface, QueryRunner } from "typeorm"

export class MindCardTagMap1688630335836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const cardRepo = queryRunner.connection.getRepository(MindCard)
        const tagRepo = queryRunner.connection.getRepository(MindTag)
        const mapRepo = queryRunner.connection.getRepository(CardTagMap)

        const cardEntities = await cardRepo.find()

        const eneryTag = await tagRepo.findOneBy({ name: 'energy' })
        const pleasantnessTag = await tagRepo.findOneBy({ name: 'pleasantness' })

        let energyIndicator: number = 0;
        let pleasantnessIndicator: number = 0;

        for (var index in cardEntities) {
            const card = cardEntities[index]

            switch (card.name) {
                case 'Angry': // '화난'
                    energyIndicator = 3
                    pleasantnessIndicator = -3
                    break
                case 'Anxious': // '불안'
                    energyIndicator = 2
                    pleasantnessIndicator = -5
                    break
                case 'Apathetic': // '냉담한'
                    energyIndicator = -1
                    pleasantnessIndicator = -1
                    break
                case 'Bored': // '지루한'
                    energyIndicator = -2
                    pleasantnessIndicator = -1
                    break
                case 'Calm': // '평온한'
                    energyIndicator = -2
                    pleasantnessIndicator = 1
                    break
                case 'Concerned': // '걱정'
                    energyIndicator = 1
                    pleasantnessIndicator = -3
                    break
                case 'Depressed': // '우울한'
                    energyIndicator = -4
                    pleasantnessIndicator = -4
                    break
                case 'Desolate': // '고독한'
                    energyIndicator = -5
                    pleasantnessIndicator = -3
                    break
                case 'Disappointed': // '실망'
                    energyIndicator = -1
                    pleasantnessIndicator = -3
                    break
                case 'Exhilarated': // '아주 신나는'
                    energyIndicator = 5
                    pleasantnessIndicator = 4
                    break
                case 'Fatigued': // '지친'
                    energyIndicator = -4
                    pleasantnessIndicator = -1
                    break
                case 'Fluttering': // '설레는'
                    energyIndicator = 4
                    pleasantnessIndicator = 3
                    break
                case 'Frightened': // '겁먹은'
                    energyIndicator = 3
                    pleasantnessIndicator = -4
                    break
                case 'Happy': // '행복한'
                    energyIndicator = 2
                    pleasantnessIndicator = 3
                    break
                case 'Hopeful': // '희망 찬'
                    energyIndicator = 1
                    pleasantnessIndicator = 3
                    break
                case 'Hyper': // '들뜬'
                    energyIndicator = 4
                    pleasantnessIndicator = 1
                    break
                case 'Irritated': // '짜증'
                    energyIndicator = 2
                    pleasantnessIndicator = -2
                    break
                case 'Joyful': // '기쁜'
                    energyIndicator = 1
                    pleasantnessIndicator = 2
                    break
                case 'Numbing': // '무감각한'
                    energyIndicator = -4
                    pleasantnessIndicator = -3
                    break
                case 'Playful': // '재미있는'
                    energyIndicator = 1
                    pleasantnessIndicator = 4
                    break
                case 'Pleased': // '만족스러운'
                    energyIndicator = 2
                    pleasantnessIndicator = 1
                    break
                case 'Restful': // '편안한'
                    energyIndicator = -3
                    pleasantnessIndicator = 3
                    break
                case 'Sad': // '슬픈'
                    energyIndicator = -2
                    pleasantnessIndicator = -2
                    break
                case 'Satisfied': // '만족스러운'
                    energyIndicator = -2
                    pleasantnessIndicator = 3
                    break
                case 'Shocked': // '충격'
                    energyIndicator = 5
                    pleasantnessIndicator = -1
                    break
                case 'Surprised': // '놀란'
                    energyIndicator = 5
                    pleasantnessIndicator = 1
                    break
                case 'Thrilled': // '짜릿한'
                    energyIndicator = 2
                    pleasantnessIndicator = 5
                    break
                case 'Tired': // '피곤한'
                    energyIndicator = -3
                    pleasantnessIndicator = -1
                    break
                case 'Touched': // '감동적인'
                    energyIndicator = -2
                    pleasantnessIndicator = 5
                    break
                default:
            }

            const eneryTagMap = mapRepo.create({
                card: card,
                indicator: energyIndicator,
                tag: eneryTag,
            })

            const pleasantnessTagMap = mapRepo.create({
                card: card,
                indicator: pleasantnessIndicator,
                tag: pleasantnessTag,
            })

            await mapRepo.save(eneryTagMap)
            await mapRepo.save(pleasantnessTagMap)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tagRepo = queryRunner.connection.getRepository(MindTag)
        await tagRepo.clear()
    }

}
