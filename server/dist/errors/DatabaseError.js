"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const messages_1 = require("../constants/messages");
const CustomError_1 = require("./CustomError");
class DatabaseError extends CustomError_1.CustomError {
    constructor(message = messages_1.MESSAGES.database.databaseFail) {
        super(message);
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    writeMessage() {
        return { message: this.message };
    }
}
exports.DatabaseError = DatabaseError;
