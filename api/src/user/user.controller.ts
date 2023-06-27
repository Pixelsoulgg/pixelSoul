import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'
import { UserService } from './user.service'
import { UserAddSteamIdDto } from './dto/userAddSteamId.dto'
import { UserAddWalletDto } from './dto/userAddWallet.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from 'src/roles/roles.decorator'

@ApiTags('user')
@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto)
  }

  @Get(':auth0Sub')
  async findOne(@Param('auth0Sub') auth0Sub: string) {
    return await this.userService.findOne({ auth0Sub })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':auth0Sub')
  async update(@Param('auth0Sub') auth0Sub: string, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.update({ auth0Sub }, userUpdateDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('addSteamId/:auth0Sub')
  async addSteamId(
    @Param('auth0Sub') auth0Sub: string,
    @Body() userAddSteamIdDto: UserAddSteamIdDto
  ) {
    return await this.userService.addSteamId(auth0Sub, userAddSteamIdDto.steamId)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('addWallet/:auth0Sub')
  async addWallet(@Param('auth0Sub') auth0Sub: string, @Body() userAddWalletDto: UserAddWalletDto) {
    return await this.userService.addWallet(auth0Sub, userAddWalletDto.walletAddress)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('addSuiWallet/:auth0Sub')
  async addSuiWallet(
    @Param('auth0Sub') auth0Sub: string,
    @Body() userAddWalletDto: UserAddWalletDto
  ) {
    return await this.userService.addSuiAddress(auth0Sub, userAddWalletDto.walletAddress)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Roles('admin')
  @Delete(':auth0Sub')
  async remove(@Param('auth0Sub') auth0Sub: string) {
    return await this.userService.remove({ auth0Sub })
  }
}
