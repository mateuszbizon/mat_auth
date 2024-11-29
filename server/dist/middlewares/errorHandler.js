"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../errors/CustomError");
function errorHandler(error, req, res, next) {
    if (error instanceof CustomError_1.CustomError) {
        res.status(error.statusCode).json(error.writeMessage());
        return;
    }
    res.status(500).json({ message: "An unknown error occurred" });
}
exports.default = errorHandler;
