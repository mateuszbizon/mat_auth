"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
function generateRefreshToken({ id, name, username, email }) {
    return jsonwebtoken_1.default.sign({
        id, username, name, email
    }, constants_1.REFRESH_TOKEN, { expiresIn: "7d" });
}
