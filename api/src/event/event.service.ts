import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.EventWhereUniqueInput
    where?: Prisma.EventWhereInput
    orderBy?: Prisma.EventOrderByWithRelationInput
  }) {
    return await this.prismaService.event.findMany({
      ...params
    })
  }
  async findOne(where: Prisma.EventWhereUniqueInput) {
    return await this.prismaService.event.findUnique({ where })
  }
  async create(data: Prisma.EventCreateInput) {
    return await this.prismaService.event.create({ data })
  }
  async findByMonth(month: number) {
    return await this.prismaService.$queryRaw`select * from Event where Month(date)=${month};`
  }
  async update(data: Prisma.EventUpdateInput, where: Prisma.EventWhereUniqueInput) {
    return await this.prismaService.event.update({ data, where })
  }
  async remove(where: Prisma.EventWhereUniqueInput) {
    return await this.prismaService.event.delete({ where })
  }
}
