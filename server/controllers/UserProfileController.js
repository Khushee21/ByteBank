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
exports.getUserProfile = void 0;
const Transation_1 = __importDefault(require("../models/Transation"));
;
const User_1 = __importDefault(require("../models/User"));
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = req.user;
        if (!authUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield User_1.default.findById(authUser.id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const transactions = yield Transation_1.default.find({ user: user._id }).sort({ date: -1 });
        res.json({
            user: {
                email: user.email,
                walletAddress: user.walletAddress.toLowerCase(),
                balance: user.balance,
                currencies: user.currencies,
            },
            transactions,
        });
    }
    catch (err) {
        //console.error(err);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});
exports.getUserProfile = getUserProfile;
