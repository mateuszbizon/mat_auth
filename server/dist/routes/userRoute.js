"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpController_1 = require("../controllers/users/signUpController");
const signInController_1 = require("../controllers/users/signInController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const getUsersControllers_1 = require("../controllers/users/getUsersControllers");
const router = express_1.default.Router();
router.post("/sign-up", signUpController_1.signUpController);
router.post("/sign-in", signInController_1.signInController);
router.get("/get-users", authMiddleware_1.authMiddleware, getUsersControllers_1.getUsersController);
exports.default = router;
