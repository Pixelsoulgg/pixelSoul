import { ApiProperty } from '@nestjs/swagger'

export class MysteryChestDto {
  @ApiProperty()
  auth0Sub: string
  @ApiProperty()
  amount: number
  @ApiProperty()
  chestId: number
}
