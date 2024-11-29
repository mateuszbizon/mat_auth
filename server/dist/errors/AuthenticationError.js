"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const messages_1 = require("../constants/messages");
const CustomError_1 = require("./CustomError");
class AuthenticationError extends CustomError_1.CustomError {
    constructor(message = messages_1.MESSAGES.auth.notAuthenticated) {
        super(message);
        this.statusCode = 401;
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
    writeMessage() {
        return { message: this.message };
    }
}
exports.AuthenticationError = AuthenticationError;
