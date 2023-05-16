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
    const grChest = []
    let amount = 0
    chestTypes.forEach((c) => {
      amount += 1
      grChest[c.rarity] = chests.find((f) => f.chestId == c.id)?.amount || 0
    })
    const mysChest = await this.prismaService.userMysteryChest.findFirst({
      where: { auth0Sub, mysteryId: 1 }
    })
    const summary = []
    Object.keys(grChest).forEach((k) => {
      const ch = {
        rariry: k,
        amount: grChest[k]
      }
      summary.push(ch)
    })
    grChest['MysteryChest'] = mysChest.amount
    console.log('group', grChest)
    return summary
  }
}
