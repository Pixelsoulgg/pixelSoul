import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MysteryChestDto } from './dto/mystery-chest.create.dto'
import { SteamService } from '../steam/steam.service'
import { ScoreService } from '../score/score.service'

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

  async increase(auth0Sub: string) {
    let amount = 0
    const user = await this.prismaService.users.findUnique({
      where: { auth0Sub }
    })
    if (user.steamId) {
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
    }
    if (user.walletAddress) {
      const score = await this.scoreService.getScore(user.walletAddress)
      if (score.investorLevel >= 1000) amount += 5
      if (score.investorLevel >= 500) amount += 4
      if (score.investorLevel >= 100) amount += 3
      if (score.investorLevel >= 50) amount += 2
      if (score.investorLevel >= 10) amount += 1
    }
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

  async descrease(data: MysteryChestDto) {
    await this.prismaService.userMysteryChest.update({
      where: { auth0Sub_mysteryId: { auth0Sub: data.auth0Sub, mysteryId: data.chestId } },
      data: {
        amount: { decrement: data.amount }
      }
    })
  }
}
