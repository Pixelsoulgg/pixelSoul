import { ApiProperty } from '@nestjs/swagger'

export class MysteryChestCreateDto {
  @ApiProperty()
  auth0Sub: string
  @ApiProperty()
  amount: number
  @ApiProperty()
  chestId: number
}
