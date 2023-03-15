import HttpException from './http'

class TooManyRequestException extends HttpException {
  constructor() {
    super(429, 'Too many requests')
  }
}

export default TooManyRequestException
