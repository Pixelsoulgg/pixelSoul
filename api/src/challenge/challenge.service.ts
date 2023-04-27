import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { SteamService } from '../steam/steam.service'
import { EligibilityDto } from './dto/eligibility.dto'
import { ResEligibility } from './challenge.interface'
import { OwnedGame } from 'src/steam/steam.interface'
import { Challenge, Prisma, UserChallenge } from '@prisma/client'

@Injectable()
export class ChallengeService {
  constructor(private prismaService: PrismaService, private steamService: SteamService) {}
  async findMany(userSteamId: string) {
    const ownedGames = await this.steamService.ownedGames(userSteamId)
    if (!ownedGames?.response?.games) {
      throw new HttpException(`Not found any games with id [${userSteamId}]`, HttpStatus.NOT_FOUND)
    }
    const ownedGameIds = ownedGames.response.games.map((m) => m.appid)
    const allChallenges = await this.prismaService.challenge.findMany({
      where: {
        gameId: { in: ownedGameIds }
      }
    })

    const challenges = await this.prismaService.userChallenge.findMany({
      where: { userSteamId, status: { not: 2 } },
      include: { challenge: true }
    })
    const userChallenges = allChallenges.map((m) => {
      const activeChallenge = challenges.find((f) => f.challengeId == m.id)
      const challs: UserChallenge & { challenge: Challenge } = {
        userSteamId,
        status: activeChallenge?.status || 0,
        challengeId: m.id,
        challenge: m
      }
      return challs
    })
    return userChallenges
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
    const challengeGame = games?.response?.games?.find((f) => f.appid == challenge.gameId)

    if (!challengeGame) {
      msg = `You have played 0 minutes. But the requirement is ${requirement.playedTime}`
    } else {
      completed = challengeGame.playtime_forever >= requirement.playedTime
      msg = `You have played ${challengeGame.playtime_forever} minutes. But the requirement is ${requirement.playedTime}`
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
      }
    }
    const result: ResEligibility = {
      complete: completed,
      message: msg
    }
    return result
  }
  async activeChallenge(challengeId: number, steamId: string) {
    const data: Prisma.UserChallengeUncheckedCreateInput = {
      userSteamId: steamId,
      challengeId,
      status: 1
    }
    return await this.prismaService.userChallenge.create({
      data
    })
  }
}
