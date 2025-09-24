import { HttpCustomError } from './http-custom-error';

export class GetAllLinkError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'GetAllLinkError';
  }
}
