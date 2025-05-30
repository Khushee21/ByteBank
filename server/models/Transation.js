"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionModel = new mongoose_1.default.Schema({
    to: String,
    amount: Number,
    currency: {
        type: String,
        enum: ["BTC", "ETC", "USDT"],
        required: true,
        set: (v) => v.toUpperCase(),
    },
    status: {
        type: String,
        enum: ["success", "pending", "failed"],
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.default = mongoose_1.default.model("Transaction", transactionModel);
