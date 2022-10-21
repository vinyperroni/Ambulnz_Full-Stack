import { BaseError } from "./BaseError";

export class UnprocessableError extends BaseError {
  constructor(message: string = "Parameters do not follow the pattern") {
    super(422, message);
  }
}
