import { Module } from '@nestjs/common'
import { ReferralController } from './referral.controller'
import { MailModule } from 'src/mail/mail.module'

@Module({
  imports: [MailModule],
  controllers: [ReferralController]
})
export class ReferralModule {}
