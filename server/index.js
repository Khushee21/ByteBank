"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const UserProfileRoutes_1 = __importDefault(require("./routes/UserProfileRoutes"));
const TransactionRouter_1 = __importDefault(require("./routes/TransactionRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', AuthRouter_1.default);
app.use('/api/user', UserProfileRoutes_1.default);
app.use('/api/transactions', TransactionRouter_1.default);
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(process.env.PORT || 5002, () => {
        console.log(`✅ Server is running on port ${process.env.PORT || 5002}`);
    });
    console.log('✅ Connected to MongoDB');
})
    .catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
});
