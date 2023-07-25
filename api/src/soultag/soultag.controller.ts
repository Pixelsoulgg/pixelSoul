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
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { SoulTagUploadDto } from './dto/soultag.upload.dto'

@ApiTags('soulTag')
@Controller({ path: 'soultag', version: '1' })
export class SoultagController {
  // @ApiBearerAuth('bearer')
  // @UseGuards(AuthGuard('jwt'))
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
  async upload(@UploadedFile() file: Express.Multer.File) {
    return { fileurl: `${file.filename}` }
  }
}
