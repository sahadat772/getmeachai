import mongoose from "mongoose";


const SubscriptionSchema = new mongoose.Schema(
    {
        toUser: { type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
        fromUser: {type: mongoose.Schema.Types.ObjectId, ref: "User", require:true },
        plan: { type: String, enum:["monthly", "yearly"], require: true},
        amount: { type: Number, require: true},
        status: {type: String, enum:["active", "cancelled"], default: "active"},
        nextRenwal: {type:Date},
    },
    {timestamps: true}
);

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);