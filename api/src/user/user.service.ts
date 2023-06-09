import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'
import { randomBytes, randomUUID } from 'crypto'
import { reward } from './user.utils'
import { MysteryChestService } from '../mystery-chest/mystery-chest.service'
import { ChestService } from '../chest/chest.service'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mysteryService: MysteryChestService,
    private chestService: ChestService
  ) {}
  async create(userDto: UserDto) {
    const auth0User = await this.prisma.users.findUnique({
      where: { auth0Sub: userDto.auth0Sub }
    })

    if (auth0User) {
      const msg = `user.auth0Sid [${auth0User.auth0Sid}] existed`
      throw new HttpException(msg, HttpStatus.NOT_FOUND)
    }
    const referralCode = await this.generateCode()
    const data: Prisma.UsersUncheckedCreateInput = {
      ...userDto,
      referralCode
    }
    //referral process
    const referredUser = await this.prisma.users.findFirst({
      where: { referralCode: userDto.referredBy }
    })
    const auth0Sub = referredUser.auth0Sub
    let hasClaim = false
    if (!referredUser) {
      throw new HttpException(
        `Referral code [${userDto.referredBy}] not found`,
        HttpStatus.NOT_FOUND
      )
    } else {
      const point = referredUser.referralAmount + 1
      const rewardData = reward(point)
      await this.prisma.users.update({
        where: { auth0Sub: referredUser.auth0Sub },
        data: {
          referralAmount: { increment: 1 }
        }
      })
      if (rewardData.mys > 0) {
        const amount = rewardData.mys
        await this.mysteryService.increase(auth0Sub, amount)
        hasClaim = true
      }
      if (rewardData.common > 0) {
        await this.chestService.increase(2, auth0Sub, rewardData.common)
        hasClaim = true
      }
      if (rewardData.gold > 0) {
        await this.chestService.increase(3, auth0Sub, rewardData.gold)
        hasClaim = true
      }
      if (rewardData.diamond > 0) {
        await this.chestService.increase(4, auth0Sub, rewardData.diamond)
        hasClaim = true
      }
      if (rewardData.mythic > 0) {
        await this.chestService.increase(6, auth0Sub, rewardData.mythic)
        hasClaim = true
      }
      if (hasClaim) {
        //save transaction
        const data: Prisma.ReferralTransactionCreateInput = {
          id: randomUUID(),
          checkPoint: point,
          referralCode: userDto.referredBy
        }
        await this.prisma.referralTransaction.create({
          data
        })
      }
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
      where,
      include: { grantRole: { select: { role: true } } }
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
  async addWallet(auth0Sub: string, wallet: string) {
    const updateData: Prisma.UsersUpdateInput = {
      walletAddress: wallet
    }
    const user = await this.findOne({ walletAddress: wallet })
    if (user && user.auth0Sub != auth0Sub)
      throw new HttpException(
        `wallet address [${user.walletAddress}] existed`,
        HttpStatus.NOT_FOUND
      )
    return await this.prisma.users.update({
      data: updateData,
      where: { auth0Sub }
    })
  }
  async addSteamId(auth0Sub: string, steamId: string) {
    const updateData: Prisma.UsersUpdateInput = {
      steamId
    }
    const user = await this.findOne({ steamId })
    if (user && user.auth0Sub != auth0Sub)
      throw new HttpException(`steam id [${user.steamId}] existed`, HttpStatus.NOT_FOUND)
    return await this.prisma.users.update({
      data: updateData,
      where: { auth0Sub }
    })
  }
  async addSuiAddress(auth0Sub: string, suiWalletAddress: string) {
    const updateData: Prisma.UsersUpdateInput = {
      suiWalletAddress
    }
    const user = await this.prisma.users.findFirst({
      where: { suiWalletAddress }
    })
    if (user && user.auth0Sub != auth0Sub)
      throw new HttpException(
        `suiWalletAddress [${user.suiWalletAddress}] existed`,
        HttpStatus.NOT_FOUND
      )
    return await this.prisma.users.update({
      data: updateData,
      where: { auth0Sub }
    })
  }

  async generateCode(): Promise<string> {
    let referralCode = randomBytes(4).toString('hex')
    while (true) {
      if (await this.prisma.users.findFirst({ where: { referralCode } }))
        referralCode = randomBytes(4).toString('hex')
      else break
    }
    return referralCode
  }
}
