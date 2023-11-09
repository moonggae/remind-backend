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
            let description: string | null = null;
            switch (image.fileName) {
                case 'Angry.svg':
                    displayName = '화난'
                    description = '분노, 불만, 또는 불공정한 상황에 대한 반응으로 나타나며, 짜증을 내거나 공격적인 행동을 보일 수 있어요.'
                    break
                case 'Anxious.svg':
                    displayName = '불안'
                    description = '걱정, 두려움, 또는 불확실한 미래에 대한 두려움을 느끼며, 마음이 불편하고 긴장된 상태로 나타날 수 있어요.'
                    break
                case 'Apathetic.svg':
                    displayName = '냉담한'
                    description = '감정이나 흥미가 부족한 상태로, 다른 사람이나 일에 대해 무관심하고 반응이 적을 때 나타나요.'
                    break
                case 'Bored.svg':
                    displayName = '지루한'
                    description = '일상이나 활동에서 새로운 자극이 부족하여 지루함을 느끼는 상태로, 반복적이거나 의미 없는 일에 대해 느낄 때 나타나요.'
                    break
                case 'Calm.svg':
                    displayName = '평온한'
                    description = '평온한 상태는 마음이 안정되고 편안해요. 스트레스나 걱정이 적을 때, 또는 휴식을 취하며 이 상태를 경험할 수 있어요.'
                    break
                case 'Concerned.svg':
                    displayName = '걱정'
                    description = '다른 사람이나 특정 상황에 대해 걱정하고 마음이 무거운 상태로, 안전하거나 건강에 대한 염려가 있을 때 나타나요.'
                    break
                case 'Depressed.svg':
                    displayName = '우울한'
                    description = '마음이 우울하고 희망이 보이지 않는 상태로, 상실감이나 실패로 인해 슬픔이나 절망감을 느낄 때 나타나요.'
                    break
                case 'Desolate.svg':
                    displayName = '고독한'
                    description = '외롭고 텅 빈 상태로, 친밀한 관계나 의미 있는 연결이 부족하여 고독을 느낄 때 나타나요.'
                    break
                case 'Disappointed.svg':
                    displayName = '실망'
                    description = '기대했던 것이 실현되지 않거나 상실감을 경험하여 실망감을 느끼는 상태로, 바라던 결과가 나오지 않았을 때 나타나요.'
                    break
                case 'Exhilarated.svg':
                    displayName = '아주 신나는'
                    description = '활기차고 열정적인 상태로, 즐거운 활동이나 좋은 소식으로 인해 매우 신나고 활동적으로 느껴질 때 나타나요.'
                    break
                case 'Fatigued.svg':
                    displayName = '지친'
                    description = '육체적, 정신적으로 피로를 느끼며, 장시간 일하거나 스트레스를 많이 받았을 때 자주 경험해요.'
                    break
                case 'Fluttering.svg':
                    displayName = '설레는'
                    description = '설렘이나 두근거림을 느끼는 상태로, 새로운 경험이나 기대감 있는 상황에서 마음이 들뜰 때 나타나요.'
                    break
                case 'Frightened.svg':
                    displayName = '겁먹은'
                    description = '무언가에 대한 깊은 두려움을 느끼며, 특히 위험하거나 위협적인 상황에서 강한 두려움을 경험할 수 있어요.'
                    break
                case 'Happy.svg':
                    displayName = '행복한'
                    description = '마음이 기쁘고 즐거운 상태로, 좋은 일이나 긍정적인 경험에서 오는 만족감과 행복을 느낄 때 나타나요.'
                    break
                case 'Hopeful.svg':
                    displayName = '희망 찬'
                    description = '미래에 대한 긍정적인 기대감을 가지고 있어요. 희망찬 상태는 성공이나 긍정적인 결과에 대한 기대감이 클 때 자주 경험하게 돼요.'
                    break
                case 'Hyper.svg':
                    displayName = '들뜬'
                    description = '매우 들뜨고 흥분된 상태로, 기쁜 일이나 새로운 자극에 의해 감정이 고조될 때 경험해요.'
                    break
                case 'Irritated.svg':
                    displayName = '짜증'
                    description = '자잘한 일에 짜증을 내거나 쉽게 화를 내는 상태로, 작은 문제나 자극에도 불쾌감을 느낄 때 나타나요.'
                    break
                case 'Joyful.svg':
                    displayName = '기쁜'
                    description = '큰 기쁨이나 행복을 느끼는 상태로, 긍정적인 사건이나 즐거운 경험으로 인해 마음이 들뜰 때 나타나요.'
                    break
                case 'Numbing.svg':
                    displayName = '무감각한'
                    description = '감정이나 신체적 감각이 둔화되어, 강한 정서적 충격이나 심한 스트레스 상황에서 경험해요.'
                    break
                case 'Playful.svg':
                    displayName = '재미있는'
                    description = '재미있고 즐거운 활동에 몰두하는 상태로, 일상의 스트레스에서 벗어나 놀이나 유쾌한 활동을 즐길 때 느끼는 감정이에요.'
                    break
                case 'Pleased.svg':
                    displayName = '만족스러운'
                    description = '기대나 바람이 충족되어 만족감을 느끼는 상태로, 성취감이나 기쁜 일에 대한 긍정적인 감정이 있을 때 나타나요.'
                    break
                case 'Restful.svg':
                    displayName = '편안한'
                    description = '마음과 몸이 안정되어 있고, 스트레스나 긴장감이 적어요.'
                    break
                case 'Sad.svg':
                    displayName = '슬픈'
                    description = '실망, 손실, 또는 좌절같은 부정적인 상황에 대한 반응으로 나타나며, 가슴 아픔, 우울함, 눈물을 동반할 수 있어요.'
                    break
                case 'Satisfied.svg':
                    displayName = '만족스러운'
                    description = '기대나 바람이 충족되었을 때 느끼는 긍정적인 감정으로, 자신이 이룬 성과나 좋은 경험에서 오는 기쁨과 감사를 느낄 때 나타나요.'
                    break
                case 'Shocked.svg':
                    displayName = '충격'
                    description = '예상치 못한 부정적인 사건이나 정보로 인해 충격을 받는 상태로, 심각한 문제나 불쾌한 소식에 마음이 크게 동요할 때 나타나요.'
                    break
                case 'Surprised.svg':
                    displayName = '놀란'
                    description = '예상치 못한 사건이나 정보에 의해 놀라움을 느끼는 상태로, 갑작스러운 변화나 뜻밖의 소식에 반응할 때 나타나요.'
                    break
                case 'Thrilled.svg':
                    displayName = '짜릿한'
                    description = '짜릿한 기분은 매우 흥분하고 열정적인 상태를 나타내요. 큰 성공이나 기대했던 일이 현실로 이루어졌을 때 이런 감정을 느낄 수 있어요.'
                    break
                case 'Tired.svg':
                    displayName = '피곤한'
                    description = '신체적, 정신적으로 피로감을 느끼는 상태로, 충분한 휴식이나 수면이 필요할 때 나타나요.'
                    break
                case 'Touched.svg':
                    displayName = '감동적인'
                    description = '감사, 존경, 또는 사랑과 같은 따뜻한 감정을 느끼며, 감성적으로 의미 있는 경험이나 행동에서 발생할 수 있어요.'
                    break
                default:
            }

            const card = cardRepo.create({ imageFile: image, name: image.fileName.split('.')[0], displayName: displayName, description: description })
            await cardRepo.save(card)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const cardRepo = queryRunner.connection.getRepository(MindCard)
        await cardRepo.clear()
    }

}
