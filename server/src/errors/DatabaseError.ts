import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {   
    constructor(message: string = MESSAGES.database.databaseFail) {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype)
    }
    
    statusCode: number = 500;
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}