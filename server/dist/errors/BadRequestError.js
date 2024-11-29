"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const CustomError_1 = require("./CustomError");
class BadRequestError extends CustomError_1.CustomError {
    constructor(message, messageCode) {
        super(message);
        this.statusCode = 400;
        this.messageCode = messageCode;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    writeMessage() {
        return { message: this.message, messageCode: this.messageCode };
    }
}
exports.BadRequestError = BadRequestError;
