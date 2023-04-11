import { Controller, Get, Injectable, Request, UseGuards } from '@nestjs/common'
import { SteamService } from './steam.service'
import { AuthGuard } from '@nestjs/passport'

@Controller({ version: '1', path: 'steam' })
@Injectable()
export class SteamController {
  constructor(private steamService: SteamService) {}
  @Get('auth')
  @UseGuards(AuthGuard('steam'))
  async login(@Request() req: any) {
    return req.user
  }
}
