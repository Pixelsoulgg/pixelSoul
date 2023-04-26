import { ApiProperty } from '@nestjs/swagger'

export class EligibilityDto {
  @ApiProperty()
  steamId: string
  @ApiProperty()
  challengeId: number
}
