"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    currencies: {
        BTC: {
            type: Number,
            default: 0,
        },
        ETC: {
            type: Number,
            default: 0,
        },
        USDT: {
            type: Number,
            default: 0,
        }
    }
});
exports.default = mongoose_1.default.model("User", userSchema);
