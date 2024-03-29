import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) { }


    async getKakaoUserUid(accessToken: String): Promise<string | undefined> {
        try {
            const kakaoUser = await firstValueFrom(
                this.httpService.get('https://kapi.kakao.com/v2/user/me', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }))
            return kakaoUser?.data?.id
        } catch (error) {
            return null
        }
    }

    async signIn(uid: string, loginType: LOGIN_TYPE) {
        let user = await this.usersService.findOne(uid, loginType);
        if (!user) {
            const inviteCode = await this.usersService.createNewInviteCode()
            user = await this.usersService.create({ uid, loginType, inviteCode })
        }
        return this.createJwtToken(user)
    }

    async refreshJwtToken(refreshToken: string) {
        try {
            const payload: ContextUser = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get("JWT_SECRET")
            })

            const user = await this.usersService.findOneById(payload.id)
            return this.createJwtToken(user)
        } catch (e) {
            const isExpired = `${e}`.includes("jwt expired");
            if (isExpired) throw new UnauthorizedException("jwt expired")
            else throw new UnauthorizedException();
        }
    }

    async verifyAsync(token: string): Promise<User | undefined> {
        try {
            const payload: ContextUser = await this.jwtService.verify(token, {
                secret: this.configService.get("JWT_SECRET")
            })

            const user = await this.usersService.findOneById(payload.id)
            return user
        } catch (e) {
            console.log(`verifyAsync - error: ${e}`)
            return null
        }
    }

    private async createJwtToken(user: User) {
        const payload: ContextUser = { id: user.id, displayName: user.displayName };
        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload, { expiresIn: "7d" })
        };
    }
}
