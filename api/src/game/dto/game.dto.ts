import { ApiProperty } from '@nestjs/swagger'
export class GameDto {
  @ApiProperty()
  steamId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  gameUrl: string

  @ApiProperty()
  logo: string

  @ApiProperty()
  socialTwitter: string

  @ApiProperty()
  socialDiscord: string

  @ApiProperty()
  socialTelegram: string
}
