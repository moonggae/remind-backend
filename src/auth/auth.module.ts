import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { constnats } from 'src/common/util/constants';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: constnats.jwtSecret,
      signOptions: { expiresIn: "24h" }
    }),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
