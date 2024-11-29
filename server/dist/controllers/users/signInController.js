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
exports.signInController = signInController;
const DatabaseError_1 = require("../../errors/DatabaseError");
const signInSchema_1 = require("../../dtos/signInSchema");
const BadRequestError_1 = require("../../errors/BadRequestError");
const messageCodes_1 = require("../../constants/messageCodes");
const getUserByUsernameService_1 = require("../../services/users/getUserByUsernameService");
const messages_1 = require("../../constants/messages");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateRefreshToken_1 = __importDefault(require("../../utils/generateRefreshToken"));
const generateAccessToken_1 = __importDefault(require("../../utils/generateAccessToken"));
const constants_1 = require("../../constants");
function signInController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const validationResult = signInSchema_1.signInSchema.safeParse(req.body);
            if (!validationResult.success) {
                return next(new BadRequestError_1.BadRequestError(validationResult.error.errors[0].message, messageCodes_1.MESSAGE_CODES.validationFail));
            }
            const existingUsername = yield (0, getUserByUsernameService_1.getUserByUsernameService)(username);
            if (!existingUsername) {
                return next(new BadRequestError_1.BadRequestError(messages_1.MESSAGES.auth.invalidCredentials, messageCodes_1.MESSAGE_CODES.invalidCredentials));
            }
            const passwordCorrect = yield bcryptjs_1.default.compare(password, existingUsername.password);
            if (!passwordCorrect) {
                return next(new BadRequestError_1.BadRequestError(messages_1.MESSAGES.auth.invalidCredentials, messageCodes_1.MESSAGE_CODES.invalidCredentials));
            }
            const refreshToken = (0, generateRefreshToken_1.default)({
                id: existingUsername.id,
                name: existingUsername.name,
                username: existingUsername.username,
                email: existingUsername.email
            });
            const accessToken = (0, generateAccessToken_1.default)({
                id: existingUsername.id
            });
            res.cookie(constants_1.TOKEN, refreshToken, {
                httpOnly: true,
            });
            res.status(200).json({
                token: accessToken,
                user: {
                    id: existingUsername.id,
                    name: existingUsername.name,
                    username: existingUsername.username,
                    email: existingUsername.email
                }
            });
        }
        catch (error) {
            console.error(error);
            next(new DatabaseError_1.DatabaseError());
        }
    });
}
