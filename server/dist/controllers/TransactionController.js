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
exports.getTransactionHistory = exports.postTransaction = void 0;
const User_1 = __importDefault(require("../models/User"));
const Transation_1 = __importDefault(require("../models/Transation"));
const qrcode_1 = __importDefault(require("qrcode"));
const postTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { type, currency, amount, recipient } = req.body;
        const currentUserWallet = (_a = req.user) === null || _a === void 0 ? void 0 : _a.wallet;
        // console.log("current user wallet", currentUserWallet);
        if (!currentUserWallet) {
            res.status(401).json({ error: 'Unauthorized or user not found' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized: user not found' });
            return;
        }
        if (!currency || !amount || amount <= 0) {
            res.status(400).json({ error: 'Invalid amount or currency.' });
            return;
        }
        const user = yield User_1.default.findById(req.user.id).select("-password");
        // console.log("res.user", req.user);
        //console.log("user", user);
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        if (type === 'send') {
            if (!recipient) {
                res.status(400).json({ error: 'Recipient not found.' });
                return;
            }
            const receiver = yield User_1.default.findOne({ walletAddress: recipient });
            if (!receiver) {
                res.status(400).json({ error: 'Recipient not found.' });
                return;
            }
            if (user.currencies[currency] < amount) {
                res.status(400).json({ error: 'Insufficient balance.' });
                return;
            }
            user.currencies[currency] -= amount;
            receiver.currencies[currency] += amount;
            yield user.save();
            yield receiver.save();
            yield Transation_1.default.create({
                user: user._id,
                type: 'send',
                currency,
                amount,
                to: recipient,
                date: new Date(),
            });
            res.json({ message: `Sent ${amount} ${currency} to ${recipient}` });
            return;
        }
        if (type === 'receive') {
            user.currencies[currency] += amount;
            const qrData = `${currency.toLowerCase()}:${user.walletAddress}`;
            const qrImage = yield qrcode_1.default.toDataURL(qrData);
            yield Transation_1.default.create({
                user: user._id,
                type: 'receive',
                currency,
                amount,
                from: 'simulation',
                to: user.walletAddress,
                date: new Date(),
            });
            res.json({ message: `Received ${amount} ${currency}` });
            return;
        }
        res.status(400).json({ error: 'Invalid transaction type.' });
        return;
    }
    catch (error) {
        //console.error('Transaction Error:', error);
        next(error);
    }
});
exports.postTransaction = postTransaction;
const getTransactionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        //console.log("userId", userId);
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: user not found' });
            return;
        }
        const transactions = yield Transation_1.default.find({ user: userId }).sort({ date: -1 });
        res.json(transactions);
    }
    catch (error) {
        // console.error('Error fetching transaction history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getTransactionHistory = getTransactionHistory;
