import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileUploadDto } from './dto/event.file.dto'
import { diskStorage } from 'multer'
import path from 'path'
import { EventService } from './event.service'
import { EventCreateDto } from './dto/event.create.dto'
import { Prisma } from '@prisma/client'
@ApiTags('Event')
@Controller({ path: 'event', version: '1' })
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image',
    type: EventCreateDto
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
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: EventCreateDto) {
    const createData: Prisma.EventCreateInput = {
      date: new Date(data.date),
      name: data.name,
      description: data.description,
      image: file.filename
    }
    return await this.eventService.create(createData)
  }
  @Get('')
  async findMany() {
    return await this.eventService.findAll({})
  }
  @Get(':month')
  async findByMonth(@Param('month') month: string) {
    return await this.eventService.findByMonth(parseInt(month))
  }
  @Patch(':eventId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image',
    type: EventCreateDto
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
  async update(
    @Param('eventId') id: string,
    @Body() data: EventCreateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const updateData: Prisma.EventUpdateInput = {
      name: data.name,
      date: new Date(data.date),
      description: data.description,
      image: file.filename
    }
    return await this.eventService.update(updateData, { id: parseInt(id) })
  }
  @Delete(':eventId')
  async remove(@Param('eventId') id: string) {
    return await this.eventService.remove({ id: parseInt(id) })
  }
}
