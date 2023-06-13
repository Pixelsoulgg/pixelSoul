import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'
import {
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET,
  GOOGLE_MAILER_REFRESH_TOKEN
} from '../app.settings'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
    const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET)
    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
    })
  }

  async sendInvite(referralCode: string, desMain: string) {
    await this.mailerService.sendMail({
      to: desMain,
      subject: 'Welcome to Pixelsoul!',
      template: './invite.mail.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        referralCode,
        senderName: 'pixelsoul team'
      }
    })
  }
}
