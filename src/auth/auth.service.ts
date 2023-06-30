import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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
