import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'
import { UserService } from './user.service'
import { UserAddSteamIdDto } from './dto/userAddSteamId.dto'
import { UserAddWalletDto } from './dto/userAddWallet.dto'

@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto)
  }
  @Get()
  async findAll() {
    return await this.userService.findAll({})
  }
  @Get(':auth0Sid')
  async findOne(@Param('auth0Sid') auth0Sid: string) {
    return await this.userService.findOne({ auth0Sid })
  }
  @Patch(':auth0Sid')
  async update(@Param('auth0Sid') auth0Sid: string, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.update({ auth0Sid }, userUpdateDto)
  }
  @Post('addSteamId/:auth0Sid')
  async addSteamId(
    @Param('auth0Sid') auth0Sid: string,
    @Body() userAddSteamIdDto: UserAddSteamIdDto
  ) {
    return await this.userService.addSteamId({ auth0Sid }, userAddSteamIdDto.steamId)
  }
  @Post('addWallet/:auth0Sid')
  async addWallet(@Param('auth0Sid') auth0Sid: string, @Body() userAddWalletDto: UserAddWalletDto) {
    return await this.userService.addWallet({ auth0Sid }, userAddWalletDto.walletAddress)
  }
  @Delete(':auth0Sid')
  async remove(@Param('auth0Sid') auth0Sid: string) {
    return await this.userService.remove({ auth0Sid })
  }
}
