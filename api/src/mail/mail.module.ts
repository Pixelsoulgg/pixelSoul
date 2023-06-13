import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import {
  GOOGLE_EMAIL_ADDRESS,
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET,
  GOOGLE_MAILER_REFRESH_TOKEN
} from 'src/app.settings'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          type: 'OAuth2',
          user: GOOGLE_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refreshToken: GOOGLE_MAILER_REFRESH_TOKEN
        }
      },
      defaults: {
        from: `"No Reply" <${GOOGLE_EMAIL_ADDRESS}>`
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
