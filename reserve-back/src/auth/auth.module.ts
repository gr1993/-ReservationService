import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'TEST_KEY',
      signOptions: { expiresIn: '60m' },
    }),
    MemberModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
