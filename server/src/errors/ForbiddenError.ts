import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {   
    constructor(message: string = MESSAGES.forbidden.notAuthorized) {
        super(message);
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
    
    statusCode: number = 403;
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}