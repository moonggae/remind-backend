import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from 'src/common/dacorator/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignInKakaoDto } from './dto/signin-kakao.dto';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';

@ApiOkResponse()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.uid, signInDto.loginType)
  }

  @Public()
  @Post('login/kakao')
  async signInKakao(@Body() signInKakaoDto: SignInKakaoDto) {
     const kakaoUid: string = await this.authService.getKakaoUserUid(signInKakaoDto.accessToken)
     return await this.authService.signIn(kakaoUid, LOGIN_TYPE.KAKAO)
  }
}