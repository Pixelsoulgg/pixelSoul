import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from '../auth/auth.module'
import { ChestModule } from '../chest/chest.module'
import { MysteryChestModule } from '../mystery-chest/mystery-chest.module'

@Module({
  imports: [AuthModule, ChestModule, MysteryChestModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
