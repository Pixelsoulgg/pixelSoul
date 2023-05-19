import { ApiProperty } from '@nestjs/swagger'
import { FileUploadDto } from './event.file.dto'

export class EventCreateDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any
  @ApiProperty()
  date: string
}
