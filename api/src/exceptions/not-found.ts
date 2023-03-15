import HttpException from './http'

class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message)
  }
}

export default NotFoundException
