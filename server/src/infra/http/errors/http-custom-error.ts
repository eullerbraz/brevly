export class HttpCustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpCustomError';
    this.statusCode = statusCode;
  }
}
