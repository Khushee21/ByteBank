import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    walletAddress : {
        type: String,
        required: true,
    },
    balance : {
        type : Number,
        default: 0,
    },
    currencies : {
        BTC: {
            type: Number,
            default: 0,
        },
        ETC : {
            type: Number,
            default: 0,
        },
        USDT : {
            type: Number,
            default: 0,
        }
    }

});

export default mongoose.model("User" , userSchema);
