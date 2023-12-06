import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    async create(createUserDto: CreateUserDto) {
        const createUser = await this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(createUser);
        return await savedUser;
    }

    async findOneById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: {
                profileImage: true
            }
        })
    }

    async findOne(uid: string, loginType: LOGIN_TYPE): Promise<User | null> {
        return await this.userRepository.findOneBy(({ uid, loginType }))
    }

    async findByInviteCode(inviteCode: string) {
        return await this.userRepository.findOne({
            where: {
                inviteCode: inviteCode
            },
            relations: {
                profileImage: true
            }
        })
    }

    async updateDisplayName(id: string, displayName: string) {
        await this.userRepository.update(id, { displayName })
    }

    async updateProfileImage(id: string, imageId: string) {
        await this.userRepository.save({ id: id, profileImage: { id: imageId } })
    }

    async createNewInviteCode(): Promise<string> {
        let isCodeConflit = false;
        do {
            const randomCode = Math.random().toString(10).substring(2, 8)
            const isCodeConflit = await this.userRepository.exist({
                where: {
                    inviteCode: randomCode
                }
            });
            if (isCodeConflit == false) {
                return randomCode
            }
        } while (isCodeConflit);
    }

    async deleteUser(userId: string) {
        await this.userRepository.softDelete({ id: userId })
    }

    async unlinkKakaoUser(kakaoUserId: number): Promise<Boolean> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    'https://kapi.kakao.com/v1/user/unlink', {
                        target_id_type: "user_id",
                        target_id: kakaoUserId
                    }, {
                        headers: { 
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `KakaoAK ${this.configService.get("KAKAO_ADMIN_KEY")}` 
                        } 
                    }
                )
            )
    
            if(response?.data?.id == kakaoUserId) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
