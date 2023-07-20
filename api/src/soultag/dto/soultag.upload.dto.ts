import { ApiProperty } from '@nestjs/swagger'

export class SoulTagUploadDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any
}
