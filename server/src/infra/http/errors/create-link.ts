export class CreateLinkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateLinkError';
  }
}
