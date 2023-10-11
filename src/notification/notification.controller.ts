import { Body, Controller, Patch, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { UpdateFCMTokenDto } from 'src/users/dto/update-fcm-token.dto';

class NotificationDto {
    @ApiProperty()
    text: string       
}

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @ApiBearerAuth('access-token')
    @Patch('token')
    async updateUserFcmToken(@CtxUser() user: ContextUser, @Body() dto: UpdateFCMTokenDto) {
        try {
            const fcmEntity = await this.notificationService.findOneToken(dto.token)
            if (!fcmEntity) {
                await this.notificationService.createToken(user.id, dto.token)
            }
            else if (fcmEntity?.user?.id != user?.id) {
                await this.notificationService.deleteToken(fcmEntity.token)
                await this.notificationService.createToken(user.id, dto.token)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    // @ApiBearerAuth('access-token')
    // @Post("test")
    // async sendNotificationTest(@CtxUser() user: ContextUser, @Body() dto: NotificationDto) {
    //     this.notificationService.sendNotificationToFriend(user.id, { text: dto.text })
    // }

}
