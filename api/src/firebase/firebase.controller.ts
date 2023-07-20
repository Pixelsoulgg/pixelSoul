import { Controller, Get } from '@nestjs/common'
import { FirebaseService } from './firebase.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('firebase')
@Controller({ path: 'firebase', version: '1' })
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}
  @Get('leaderBoardBot')
  leaderBoardBot() {
    return this.firebaseService.leaderBoardBot()
  }
  @Get('leaderBoardHuman')
  leaderBoardHuman() {
    return this.firebaseService.leaderBoardHuman()
  }
}
