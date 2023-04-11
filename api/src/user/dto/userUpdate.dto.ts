import { ApiProperty } from '@nestjs/swagger'
export class UserUpdateDto {
  @ApiProperty()
  walletAddress: string

  @ApiProperty()
  steamId: string

  @ApiProperty()
  auth0Sid: string

  @ApiProperty()
  auth0NickName: string

  @ApiProperty()
  auth0Name: string

  @ApiProperty()
  auth0Sub: string

  @ApiProperty()
  imageUrl: string
}
