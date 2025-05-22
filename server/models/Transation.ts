import mongoose from "mongoose";
const transactionModel = new mongoose.Schema({
    to: String,
    amount: Number,
    currency: {
        type: String,
        enum: ["BTS" , "ETC" , "USDT"],
        required: true,
    },
    status : {
        type: String,
        enum: ["success" , "pending" , "failed"],
        default: "pending",
    },
    date : {
        type : Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model("Transaction" , transactionModel);