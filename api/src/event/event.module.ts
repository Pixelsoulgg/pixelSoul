import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { PrismaService } from 'src/prisma.service'
import { EventController } from './event.controller'

@Module({
  providers: [EventService, PrismaService],
  controllers: [EventController]
})
export class EventModule {}
