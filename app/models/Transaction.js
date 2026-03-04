import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', require:true},
        fromName: {type: String,require:true},
        fromEmail: {type: String},
        amount: {type: Number, require: true},
        message: {type: String, default:''},
        method: {type: String, enum: ["bkash", "Nagad"], require: true},
        transactionId: {type: String},
        status: {type: String, enum: ["pending","complete", "Failed"], default: "pending"},
    },
    {timestamps:true}
);

export default  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);