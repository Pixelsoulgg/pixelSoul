import { Module } from '@nestjs/common'
import { SoultagService } from './soultag.service'
import { SoultagController } from './soultag.controller'

@Module({
  providers: [SoultagService],
  controllers: [SoultagController]
})
export class SoultagModule {}
