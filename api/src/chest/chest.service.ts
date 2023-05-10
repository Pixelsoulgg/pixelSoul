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
}
