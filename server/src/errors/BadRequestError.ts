import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
    constructor(message: string, messageCode: string) {
        super(message)
        this.messageCode = messageCode
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    messageCode: string
    statusCode: number = 400
    writeMessage(): { message: string, messageCode: string } {
        return { message: this.message, messageCode: this.messageCode }
    }
}