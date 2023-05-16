import { ApiProperty } from '@nestjs/swagger'

export class OpenChestDto {
  @ApiProperty()
  auth0Sub: string
  @ApiProperty()
  type: number
  @ApiProperty()
  amount: number
}
