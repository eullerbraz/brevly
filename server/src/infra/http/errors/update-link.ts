import { HttpCustomError } from './http-custom-error';

export class UpdateLinkError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'UpdateLinkError';
  }
}
