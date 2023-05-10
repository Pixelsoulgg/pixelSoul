import { ApiProperty } from '@nestjs/swagger'
export class ChestDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  rarityId: number

  @ApiProperty()
  image: string

  @ApiProperty()
  claimDate: string
}
