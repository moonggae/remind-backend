import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { constnats } from 'src/common/util/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}


  async getKakaoUserUid(accessToken: String) : Promise<string> {
    const kakaoUser = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', { 
      headers: { Authorization: `Bearer ${accessToken}` }
    }))
    return kakaoUser.data.id
  }

  async signIn(uid: string, loginType: LOGIN_TYPE) {
    let user = await this.usersService.findOne(uid, loginType);
    if (!user) {
      user = await this.usersService.create({uid, loginType})
    }
    return this.createJwtToken(user)
  }

  async refreshJwtToken(refreshToken: string) {
    const payload: ContextUser = await this.jwtService.verifyAsync(refreshToken, {
      secret: constnats.jwtSecret
    })

    const user = await this.usersService.findOneById(payload.id)
    return this.createJwtToken(user)
  }

  private async createJwtToken(user: User) {
    const payload : ContextUser = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {expiresIn:"7d"})
    };
  }
}
