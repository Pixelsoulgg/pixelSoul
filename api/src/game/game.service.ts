import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { GameDto } from './dto/game.dto'

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  async create(gameDto: GameDto) {
    const game = await this.prisma.games.findFirst({
      where: { steamId: gameDto.steamId }
    })
    if (game) {
      const msg = `games.name [${game.name} existed]`
      throw new HttpException(msg, HttpStatus.NOT_FOUND)
    }
    const data: Prisma.GamesUncheckedCreateInput = {
      steamId: gameDto.steamId,
      name: gameDto.name,
      description: gameDto.description,
      gameUrl: gameDto.gameUrl,
      logo: gameDto.logo,
      socialTwitter: gameDto.socialTwitter,
      socialTelegram: gameDto.socialTelegram,
      socialDiscord: gameDto.socialDiscord
    }
    return await this.prisma.games.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GamesWhereUniqueInput
    where?: Prisma.GamesWhereInput
    orderBy?: Prisma.GamesOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.games.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        gameTypes: true
      }
    })
  }
  async findOne(where: Prisma.GamesWhereUniqueInput) {
    return await this.prisma.games.findUnique({ where })
  }
  async remove(where: Prisma.GamesWhereUniqueInput) {
    return await this.prisma.games.delete({ where })
  }
  async update(where: Prisma.GamesWhereUniqueInput, gameDto: GameDto) {
    const data: Prisma.GamesUncheckedCreateInput = {
      steamId: gameDto.steamId,
      name: gameDto.name,
      description: gameDto.description,
      gameUrl: gameDto.gameUrl,
      logo: gameDto.logo,
      socialTwitter: gameDto.socialTwitter,
      socialTelegram: gameDto.socialTelegram,
      socialDiscord: gameDto.socialDiscord
    }
    return await this.prisma.games.update({
      data,
      where
    })
  }
}
