import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ReferralEmailDto } from './dto/referral.mail.dto'
import { MailService } from '../mail/mail.service'
import { AuthGuard } from '@nestjs/passport'

@Controller({ path: 'referral', version: '1' })
@ApiTags('Referal')
export class ReferralController {
  constructor(private mailService: MailService) {}
  @Post('mail')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async send(@Body() mailDto: ReferralEmailDto) {
    return await this.mailService.sendInvite(mailDto.referralCode, mailDto.desMail)
  }
}
