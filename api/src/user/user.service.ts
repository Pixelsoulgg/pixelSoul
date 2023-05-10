import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(userDto: UserDto) {
    const auth0User = await this.prisma.users.findUnique({
      where: { auth0Sub: userDto.auth0Sub }
    })

    if (auth0User) {
      const msg = `user.auth0Sid [${auth0User.auth0Sid}] existed`
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

  async findOne(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.findUnique({
      where
    })
  }

  async remove(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.delete({ where })
  }

  async update(where: Prisma.UsersWhereUniqueInput, userUpdateDto: UserUpdateDto) {
    const updateData: Prisma.UsersUpdateInput = {
      walletAddress: userUpdateDto.walletAddress,
      steamId: userUpdateDto.steamId,
      imageUrl: userUpdateDto.imageUrl,
      auth0NickName: userUpdateDto.auth0NickName,
      auth0Name: userUpdateDto.auth0Name,
      auth0Sid: userUpdateDto.auth0Sid
    }
    return await this.prisma.users.update({
      data: updateData,
      where
    })
  }
  async addWallet(where: Prisma.UsersWhereUniqueInput, wallet: string) {
    const updateData: Prisma.UsersUpdateInput = {
      walletAddress: wallet
    }
    const user = await this.findOne({ walletAddress: wallet })
    if (user)
      throw new HttpException(
        `wallet address [${user.walletAddress}] existed`,
        HttpStatus.NOT_FOUND
      )
    return await this.prisma.users.update({
      data: updateData,
      where
    })
  }
  async addSteamId(where: Prisma.UsersWhereUniqueInput, steamId: string) {
    const updateData: Prisma.UsersUpdateInput = {
      steamId
    }
    const user = await this.findOne({ steamId })
    if (user) throw new HttpException(`steam id [${user.steamId}] existed`, HttpStatus.NOT_FOUND)
    return await this.prisma.users.update({
      data: updateData,
      where
    })
  }
  async addSuiAddress(where: Prisma.UsersWhereUniqueInput, suiWalletAddress: string) {
    const updateData: Prisma.UsersUpdateInput = {
      suiWalletAddress
    }
    const user = await this.prisma.users.findFirst({
      where: { suiWalletAddress }
    })
    if (user)
      throw new HttpException(
        `suiWalletAddress [${user.suiWalletAddress}] existed`,
        HttpStatus.NOT_FOUND
      )
    return await this.prisma.users.update({
      data: updateData,
      where
    })
  }
}
