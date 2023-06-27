import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MysteryChestDto } from './dto/mystery-chest.create.dto'
import { SteamService } from '../steam/steam.service'
import { ScoreService } from '../score/score.service'
import { randomIntFromInterval } from '../utils/utils'
import { OpenChestDto } from './dto/mystery-chest.open.dto'

@Injectable()
export class MysteryChestService {
  constructor(
    private prismaService: PrismaService,
    private steamService: SteamService,
    private scoreService: ScoreService
  ) {}

  async findAll(auth0Sub: string) {
    return await this.prismaService.userMysteryChest.findMany({
      where: { auth0Sub },
      include: {
        mysteryChest: true
      }
    })
  }

  async claim(auth0Sub: string) {
    let amount = 0
    let claimSteam = 0
    let claimWallet = 0
    const user = await this.prismaService.users.findUnique({
      where: { auth0Sub }
    })
    if (user.steamId && user.claimSteamChest == 0) {
      const steamInfor = await this.steamService.ownedGames(user.steamId)
      if (steamInfor?.response?.game_count > 0) {
        const games = steamInfor.response.games

        //Hours
        let timeCount = 0
        games.forEach((f) => {
          timeCount += f.playtime_forever / 60
        })
        if (timeCount >= 1000) amount += 5
        else if (timeCount >= 500) amount += 4
        else if (timeCount >= 100) amount += 3
        else if (timeCount >= 50) amount += 2
        else if (timeCount >= 10) amount += 1
      }
      claimSteam = 1
    }
    if (user.walletAddress && user.claimWalletChest == 0) {
      const score = await this.scoreService.getScore(user.walletAddress)
      if (score.investorLevel >= 1000) amount += 5
      if (score.investorLevel >= 500) amount += 4
      if (score.investorLevel >= 100) amount += 3
      if (score.investorLevel >= 50) amount += 2
      if (score.investorLevel >= 10) amount += 1
      claimWallet = 1
    }
    if (amount > 0) {
      await this.increase(auth0Sub, amount)
      await this.prismaService.users.update({
        where: { auth0Sub },
        data: { claimSteamChest: claimSteam, claimWalletChest: claimWallet }
      })
    }
  }

  async descrease(data: MysteryChestDto) {
    await this.prismaService.userMysteryChest.update({
      where: { auth0Sub_mysteryId: { auth0Sub: data.auth0Sub, mysteryId: data.chestId } },
      data: {
        amount: { decrement: data.amount }
      }
    })
  }
  async increase(auth0Sub: string, amount: number) {
    await this.prismaService.userMysteryChest.upsert({
      where: { auth0Sub_mysteryId: { auth0Sub, mysteryId: 1 } },
      create: {
        amount,
        auth0Sub,
        mysteryId: 1
      },
      update: {
        amount: { increment: amount }
      }
    })
  }

  async openMysteryChest(data: OpenChestDto) {
    const { auth0Sub, type, amount } = data
    const mysteryChest = await this.prismaService.userMysteryChest.findUnique({
      where: { auth0Sub_mysteryId: { mysteryId: type, auth0Sub } }
    })
    if (!mysteryChest) {
      throw new HttpException(`Please claim mystery chest before opening`, HttpStatus.BAD_REQUEST)
    }
    if (mysteryChest?.amount < amount)
      throw new HttpException(
        `Insufficient chest. owned: ${mysteryChest.amount}, open: ${amount} `,
        HttpStatus.BAD_REQUEST
      )
    await this.prismaService.userMysteryChest.update({
      where: { auth0Sub_mysteryId: { auth0Sub, mysteryId: type } },
      data: { amount: { decrement: amount } }
    })
    const chests = await this.prismaService.chest.findMany({
      where: { partner: null },
      select: { id: true, rarity: true }
    })

    // common 39%
    // gold 30%
    // diamond 25%
    // legendary 5%
    // mythic 1%
    const raritys = []
    let selectedChest = {
      id: 0,
      rarity: ''
    }
    for (let i = 0; i < amount; i++) {
      selectedChest = undefined
      for (let i = 0; i < 39; i++) {
        raritys.push('Common')
        if (i < 30) raritys.push('Gold')
        if (i < 25) raritys.push('Diamond')
        if (i < 5) raritys.push('Legendary')
        if (i == 25) raritys.push('Mythic')
      }
      const index = randomIntFromInterval(0, raritys.length - 1)
      selectedChest = chests.find((f) => f.rarity == raritys[index])
      // insert chest for player
      await this.prismaService.userChest.upsert({
        create: { chestId: selectedChest.id, auth0Sub, amount: 1 },
        update: { amount: { increment: 1 }, latestClaim: new Date().toISOString() },
        where: { auth0Sub_chestId: { chestId: selectedChest.id, auth0Sub } }
      })
    }
    return { reward: selectedChest.rarity }
  }
}
