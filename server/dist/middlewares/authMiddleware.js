"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const ForbiddenError_1 = require("../errors/ForbiddenError");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants");
function authMiddleware(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return next(new ForbiddenError_1.ForbiddenError());
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.ACCESS_TOKEN);
        res.locals.userId = decodedToken.id;
        next();
    }
    catch (error) {
        console.error(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return next(new ForbiddenError_1.ForbiddenError());
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return next(new ForbiddenError_1.ForbiddenError());
        }
        next(new ForbiddenError_1.ForbiddenError());
    }
}
