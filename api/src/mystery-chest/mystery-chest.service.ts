import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MysteryChestCreateDto } from './dto/mystery-chest.create.dto'

@Injectable()
export class MysteryChestService {
  constructor(private prismaService: PrismaService) {}

  async findAll(auth0Sub: string) {
    return await this.prismaService.userMysteryChest.findMany({
      where: { auth0Sub },
      include: {
        mysteryChest: true
      }
    })
  }

  async increase(data: MysteryChestCreateDto) {
    await this.prismaService.userMysteryChest.upsert({
      where: { auth0Sub_mysteryId: { auth0Sub: data.auth0Sub, mysteryId: data.chestId } },
      create: {
        amount: data.amount,
        auth0Sub: data.auth0Sub,
        mysteryId: data.chestId
      },
      update: {
        amount: { increment: data.amount }
      }
    })
  }
}
