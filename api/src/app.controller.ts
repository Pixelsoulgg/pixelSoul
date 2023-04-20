import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('pixelSoul')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root() {
    return this.appService.root()
  }
  @Get()
  health(): string {
    return this.appService.health()
  }
}
