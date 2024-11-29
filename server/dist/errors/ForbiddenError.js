"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const messages_1 = require("../constants/messages");
const CustomError_1 = require("./CustomError");
class ForbiddenError extends CustomError_1.CustomError {
    constructor(message = messages_1.MESSAGES.forbidden.notAuthorized) {
        super(message);
        this.statusCode = 403;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    writeMessage() {
        return { message: this.message };
    }
}
exports.ForbiddenError = ForbiddenError;
