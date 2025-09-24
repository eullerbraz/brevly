import { HttpCustomError } from './http-custom-error';

export class GetLinkError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'GetLinkError';
  }
}
