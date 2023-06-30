import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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
    const payload : ContextUser = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {expiresIn:"7d"})
    };
  }
}
