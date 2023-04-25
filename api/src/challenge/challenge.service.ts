import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { SteamService } from '../steam/steam.service'
import { EligibilityDto } from './dto/eligibility.dto'

@Injectable()
export class ChallengeService {
  constructor(private prismaService: PrismaService, private steamService: SteamService) {}
  async findMany(userSteamId: string) {
    const challenges = await this.prismaService.userChallenge.findMany({
      where: { userSteamId },
      include: {
        challenge: true
      }
    })

    return challenges
  }
  async checkEligibility(eligibilityDto: EligibilityDto): Promise<boolean> {
    const { challengeId, steamId } = eligibilityDto
    const userChallenge = await this.prismaService.userChallenge.findFirst({
      where: { userSteamId: steamId, challengeId, actived: 1, status: 0 }
    })
    if (!userChallenge)
      throw new HttpException(`challenge [${challengeId}] is not available`, HttpStatus.NOT_FOUND)
    const challenge = await this.prismaService.challenge.findUnique({
      where: { id: challengeId },
      include: { playedTimeRequirement: true }
    })

    const requirement = challenge.playedTimeRequirement

    const games = await this.steamService.ownedGames(steamId)

    let completed = false
    if (games) {
      const g = games.response.games.find((f) => f.appid == challenge.gameId)
      if (g) completed = g.playtime_forever >= requirement.playedTime
    }
    if (completed) {
      await this.prismaService.users.update({
        where: { steamId },
        data: { gold: { increment: requirement.reward } }
      })
      await this.prismaService.userChallenge.update({
        where: { challengeId_userSteamId: { challengeId, userSteamId: steamId } },
        data: { status: 1 }
      })
    }
    return completed
  }
  async activeChallenge(challengeId: number, steamId: string) {
    return await this.prismaService.userChallenge.update({
      where: { challengeId_userSteamId: { userSteamId: steamId, challengeId } },
      data: { actived: 1 }
    })
  }
}
