import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(userDto: UserDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: userDto.email }
    })
    if (user) {
      const msg = `user.email [${user.email}] existed`
      throw new HttpException(msg, HttpStatus.NOT_FOUND)
    }
    const data: Prisma.UsersUncheckedCreateInput = {
      ...userDto
    }
    return await this.prisma.users.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UsersWhereUniqueInput
    where?: Prisma.UsersWhereInput
    orderBy?: Prisma.UsersOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }
  async remove(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.delete({ where })
  }
  async update(where: Prisma.UsersWhereUniqueInput, userUpdateDto: UserUpdateDto) {
    const updateData: UserUpdateDto = {
      walletAddress: userUpdateDto.walletAddress,
      steamId: userUpdateDto.steamId,
      imageUrl: userUpdateDto.imageUrl
    }
    console.log(updateData)

    return await this.prisma.users.update({
      data: updateData,
      where
    })
  }
}
