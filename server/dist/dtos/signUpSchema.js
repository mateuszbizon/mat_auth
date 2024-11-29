"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
const validations_1 = require("../constants/validations");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(validations_1.USER_NAME_MIN_LENGTH, validations_1.USER_NAME_LENGTH_MESSAGE),
    username: zod_1.z.string().min(validations_1.USERNAME_MIN_LENGTH, validations_1.USERNAME_LENGTH_MESSAGE).max(validations_1.USERNAME_MAX_LENGTH, validations_1.USERNAME_LENGTH_MESSAGE)
        .refine(value => {
        return !validations_1.NO_WHITESPACE_REGEX.test(value);
    }, validations_1.USERNAME_WHITESPACE_MESSAGE),
    email: zod_1.z.string().email(validations_1.EMAIL_MESSAGE),
    password: zod_1.z.string().min(validations_1.PASSWORD_MIN_LENGTH, validations_1.PASSWORD_LENGTH_MESSAGE)
});
