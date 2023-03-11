import HttpException from './http';

class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, "Invalid api key");
  }
}

export default NotAuthorizedException;
