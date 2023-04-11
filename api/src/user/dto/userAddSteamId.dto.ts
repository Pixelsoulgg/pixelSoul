import { ApiProperty } from '@nestjs/swagger'
export class UserAddSteamIdDto {
  @ApiProperty()
  steamId: string
}
