import { HttpCustomError } from './http-custom-error';

export class RemoveLinkError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'RemoveLinkError';
  }
}
