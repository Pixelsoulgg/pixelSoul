import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ChestDto } from './dto/chest.dto'

@Injectable()
export class ChestService {
  constructor(private prismaService: PrismaService) {}
  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserChestWhereUniqueInput
    where?: Prisma.UserChestWhereInput
    orderBy?: Prisma.UserChestOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prismaService.userChest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        chest: true
      }
    })
  }
  async findOne(where: Prisma.ChestWhereUniqueInput) {
    return await this.prismaService.chest.findUnique({ where })
  }
  async remove(where: Prisma.ChestWhereUniqueInput) {
    return await this.prismaService.chest.delete({ where })
  }
  async create(data: ChestDto) {
    return await this.prismaService.chest.create({
      data
    })
  }
  async chest(auth0Sub: string) {
    const chests = await this.findAll({ where: { auth0Sub } })
    const chestTypes = await this.prismaService.chest.findMany({})
    const mysChest = await this.prismaService.userMysteryChest.findFirst({
      where: { auth0Sub, mysteryId: 1 }
    })
    const grChest = []
    grChest['My Chest'] = chests.reduce((s, c) => s + c.amount, 0) + (mysChest?.amount || 0)
    chestTypes.forEach((c) => {
      grChest[c.rarity] = chests.find((f) => f.chestId == c.id)?.amount || 0
    })

    grChest['Mystery'] = mysChest?.amount
    const summary = []
    Object.keys(grChest).forEach((k) => {
      const ch = {
        rarity: k,
        amount: grChest[k]
      }
      summary.push(ch)
    })
    return summary
  }
}
