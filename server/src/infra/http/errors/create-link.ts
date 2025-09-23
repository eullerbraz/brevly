import { HttpCustomError } from './http-custom-error';

export class CreateLinkError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'CreateLinkError';
  }
}
