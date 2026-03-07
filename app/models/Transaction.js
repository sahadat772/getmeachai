import mongoose from 'mongoose';

if (mongoose.models.Transaction) {
    delete mongoose.models.Transaction;
}

const TransactionSchema = new mongoose.Schema(
    {
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fromName: {
            type: String,
            required: true,
        },
        fromEmail: {
            type: String,
        },
        amount: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            default: '',
        },
        method: {
            type: String,
            enum: ['bKash', 'Nagad'],
            required: true,
        },
        transactionId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'completed',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);