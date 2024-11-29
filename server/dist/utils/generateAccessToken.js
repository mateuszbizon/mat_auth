"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
function generateAccessToken({ id }) {
    return jsonwebtoken_1.default.sign({
        id
    }, constants_1.ACCESS_TOKEN, { expiresIn: "1m" });
}
