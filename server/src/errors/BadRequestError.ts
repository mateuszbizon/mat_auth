import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    statusCode: number = 400
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}