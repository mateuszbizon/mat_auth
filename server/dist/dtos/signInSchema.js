"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = void 0;
const zod_1 = require("zod");
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username can't be empty"),
    password: zod_1.z.string().min(1, "Password can't be empty"),
});
