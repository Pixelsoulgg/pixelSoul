import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  controllers: [SteamController],
  providers: [SteamService, SteamStrategy],
  imports: [PassportModule]
})
export class SteamModule {}
