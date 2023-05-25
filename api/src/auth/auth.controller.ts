import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  hello(@Request() req: any) {
    return req.user
  }
}
