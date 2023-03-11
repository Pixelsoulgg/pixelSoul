import HttpException from './http';

class ContentException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default ContentException;
