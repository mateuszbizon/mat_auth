"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = signUpController;
const signUpSchema_1 = require("../../dtos/signUpSchema");
const BadRequestError_1 = require("../../errors/BadRequestError");
const getUserByUsernameService_1 = require("../../services/users/getUserByUsernameService");
const messages_1 = require("../../constants/messages");
const getUserByEmailService_1 = require("../../services/users/getUserByEmailService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUserService_1 = require("../../services/users/createUserService");
const messageCodes_1 = require("../../constants/messageCodes");
function signUpController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, username, email, password } = req.body;
        try {
            const validationResult = signUpSchema_1.signUpSchema.safeParse(req.body);
            if (!validationResult.success) {
                return next(new BadRequestError_1.BadRequestError(validationResult.error.errors[0].message, messageCodes_1.MESSAGE_CODES.validationFail));
            }
            const existingUsername = yield (0, getUserByUsernameService_1.getUserByUsernameService)(username);
            if (existingUsername) {
                return next(new BadRequestError_1.BadRequestError(messages_1.MESSAGES.user.usernameTaken, messageCodes_1.MESSAGE_CODES.usernameTaken));
            }
            const existingEmail = yield (0, getUserByEmailService_1.getUserByEmailService)(email);
            if (existingEmail) {
                return next(new BadRequestError_1.BadRequestError(messages_1.MESSAGES.user.emailTaken, messageCodes_1.MESSAGE_CODES.emailTaken));
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const createdUser = yield (0, createUserService_1.createUserService)({ name, username, email, password: hashedPassword });
            res.status(201).json({
                message: "User signed up"
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
