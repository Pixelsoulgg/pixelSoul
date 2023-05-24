import { ApiProperty } from '@nestjs/swagger'

export class EventCreateDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any
  @ApiProperty()
  date: string
}
