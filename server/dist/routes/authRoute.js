"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getTokenController_1 = require("../controllers/auth/getTokenController");
const router = express_1.default.Router();
router.get("/get-token", getTokenController_1.getTokenController);
exports.default = router;
