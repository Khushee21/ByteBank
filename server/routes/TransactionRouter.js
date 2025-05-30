"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const TransactionController_1 = require("../controllers/TransactionController");
const authMiddlewar_1 = require("../middlewares/authMiddlewar");
router.post('/post', authMiddlewar_1.authMiddleware, TransactionController_1.postTransaction);
router.get('/history', authMiddlewar_1.authMiddleware, TransactionController_1.getTransactionHistory);
exports.default = router;
