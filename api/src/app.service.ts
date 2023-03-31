import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root() {
    return 'Pixel Soul API'
  }
  health(): string {
    return 'OK'
  }
}
