import { Module } from '@nestjs/common'
import { ReferralController } from './referral.controller'
import { MailModule } from '../mail/mail.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MailModule, AuthModule],
  controllers: [ReferralController]
})
export class ReferralModule {}
