import { HttpCustomError } from './http-custom-error';

export class ExportError extends HttpCustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'ExportError';
  }
}
