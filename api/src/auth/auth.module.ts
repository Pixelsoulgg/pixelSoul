import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './auth.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [PassportModule, JwtModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
