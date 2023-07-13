import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { diskStorage } from 'multer'
import { Roles } from 'src/roles/roles.decorator'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { SoulTagUploadDto } from './dto/soultag.upload.dto'

@ApiTags('soulTag')
@Controller('soultag')
export class SoultagController {
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard('jwt'))
  @Post('uploadImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image',
    type: SoulTagUploadDto
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'upload',
        filename(req, file, cb) {
          cb(null, new Date().toISOString() + file.originalname)
        }
      })
    })
  )
  async upload(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return `${req.headers['origin']}/${file.filename}`
  }
}
