import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { SteamService } from 'src/steam/steam.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ChallengeService {
  constructor(
    private prismaService: PrismaService,
    private steamService: SteamService,
    private userSevice: UserService
  ) {}
  async findMany(userSteamId: string) {
    const challenges = this.prismaService.userChallenge.findMany({
      where: { userSteamId },
      include: {
        challenge: true
      }
    })
    return challenges
  }
  async checkEligibility(params: { challengeId: number; steamId: string }): Promise<boolean> {
    const { challengeId, steamId } = params
    const challenge = await this.prismaService.challenge.findUnique({ where: { id: challengeId } })
    const requirement = await this.prismaService.playedTimeRequirement.findFirst({
      where: { challengeId }
    })
    const games = this.steamService.ownedGames(steamId)
    let completed = false
    if (games) {
      const g = (await games).response.games.find((f) => f.appid == challenge.gameId)
      completed = requirement.playedTime == g.playtime_forever
    }
    if (completed) {
      this.prismaService.users.update({
        where: { steamId },
        data: { gold: requirement.reward }
      })
    }
    return completed
  }
}
