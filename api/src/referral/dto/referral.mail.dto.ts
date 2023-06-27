import { ApiProperty } from '@nestjs/swagger'

export class ReferralEmailDto {
  @ApiProperty()
  referralCode: string
  @ApiProperty()
  desMail: string
}
