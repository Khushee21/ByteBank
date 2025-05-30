"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserProfileController_1 = require("../controllers/UserProfileController");
const authMiddlewar_1 = require("../middlewares/authMiddlewar");
const router = express_1.default.Router();
// Add authMiddleware if required
router.get('/getProfile', authMiddlewar_1.authMiddleware, UserProfileController_1.getUserProfile);
exports.default = router;
