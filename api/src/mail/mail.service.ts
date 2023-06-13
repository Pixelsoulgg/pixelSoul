import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

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
