import { ApiProperty } from '@nestjs/swagger'
export class UserDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  walletAddress: string

  @ApiProperty()
  steamId: string

  @ApiProperty()
  imageUrl: string
}
