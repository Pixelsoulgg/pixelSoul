import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { SteamService } from '../steam/steam.service'
import { EligibilityDto } from './dto/eligibility.dto'
import { ResEligibility } from './challenge.interface'
import { OwnedGame } from 'src/steam/steam.interface'

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
  async checkEligibility(eligibilityDto: EligibilityDto): Promise<ResEligibility> {
    const { challengeId, steamId } = eligibilityDto
    const userChallenge = await this.prismaService.userChallenge.findFirst({
      where: { userSteamId: steamId, challengeId, status: 1 }
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
    let msg = ''
    let challengeGame: OwnedGame
    if (games) {
      const g = games.response.games.find((f) => f.appid == challenge.gameId)
      if (g) {
        completed = g.playtime_forever >= requirement.playedTime
        challengeGame = g
      }
    }
    if (completed) {
      await this.prismaService.users.update({
        where: { steamId },
        data: { gold: { increment: requirement.reward } }
      })
      await this.prismaService.userChallenge.update({
        where: { challengeId_userSteamId: { challengeId, userSteamId: steamId } },
        data: { status: 2 }
      })
      msg = `You have completed challenge and get ${requirement.reward} golds`
    } else {
      msg = `You have played ${challengeGame.playtime_forever} minutes. But the requirement is ${requirement.playedTime}`
    }
    const result: ResEligibility = {
      complete: completed,
      message: msg
    }
    return result
  }
  async activeChallenge(challengeId: number, steamId: string) {
    return await this.prismaService.userChallenge.update({
      where: { challengeId_userSteamId: { userSteamId: steamId, challengeId } },
      data: { status: 1 }
    })
  }
}