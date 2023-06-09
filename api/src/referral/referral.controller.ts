import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ReferralEmailDto } from './dto/referral.mail.dto'
import { MailService } from 'src/mail/mail.service'

@Controller({ path: 'referral', version: '1' })
@ApiTags('Referal')
export class ReferralController {
  constructor(private mailService: MailService) {}
  @Post('mail')
  async send(@Body() mailDto: ReferralEmailDto) {
    return await this.mailService.sendInvite(mailDto.referralCode, mailDto.desMail)
  }
}
