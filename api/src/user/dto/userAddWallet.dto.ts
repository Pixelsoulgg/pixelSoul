import { ApiProperty } from '@nestjs/swagger'
export class UserAddWalletDto {
  @ApiProperty()
  walletAddress: string
}
