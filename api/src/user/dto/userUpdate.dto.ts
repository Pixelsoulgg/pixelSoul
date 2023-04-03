import { ApiProperty } from '@nestjs/swagger'
export class UserUpdateDto {
  @ApiProperty()
  walletAddress: string

  @ApiProperty()
  steamId: string

  @ApiProperty()
  imageUrl: string
}
