import { Controller, Post, Body, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from 'src/common/dacorator/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignInKakaoDto } from './dto/signin-kakao.dto';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { Request } from 'express';

@ApiOkResponse()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.uid, signInDto.loginType)
    }

    @Public()
    @Post('login/kakao')
    async signInKakao(@Body() signInKakaoDto: SignInKakaoDto) {
        const kakaoUid: string | null = await this.authService.getKakaoUserUid(signInKakaoDto.accessToken)
        if(!kakaoUid) throw new UnauthorizedException() // todo test
        return await this.authService.signIn(kakaoUid, LOGIN_TYPE.KAKAO)
    }

    @Public()
    @Post('/refresh')
    async refreshToken(@Req() request: Request) {
        const splitedAuthorization = request.headers.authorization.split(' ');
        if (splitedAuthorization[0].toLowerCase() == 'bearer') {
            return this.authService.refreshJwtToken(splitedAuthorization[1])
        } else {
            throw new BadRequestException()
        }
    }
}