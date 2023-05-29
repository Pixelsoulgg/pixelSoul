import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
