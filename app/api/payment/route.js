import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import Transaction from "../../models/Transaction";
import { sendSupportEmail } from "../../lib/mail";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { toUsername, fromName, amount, message, method } = await req.json();

    if (!toUsername || !fromName || !amount || !method) {
      return NextResponse.json({ message: "সব তথ্য দিন" }, { status: 400 });
    }

    await connectDB();

    const toUser = await User.findOne({ username: toUsername });
    if (!toUser) {
      return NextResponse.json(
        { message: "ক্রিয়েটর পাওয়া যায়নি" },
        { status: 404 },
      );
    }

    const transaction = await Transaction.create({
      toUser: toUser._id,
      fromName,
      amount,
      message,
      method,
      status: "completed",
    });

    await User.findByIdAndUpdate(toUser._id, { $inc: { balance: amount } });

    // Email notification
    try {
      await sendSupportEmail({
        creatorEmail: toUser.email,
        creatorName: toUser.name,
        fromName,
        amount,
        message,
        method,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError.message);
      // email fail হলেও payment সফল থাকবে
    }

    return NextResponse.json(
      { message: "পেমেন্ট সফল", transaction },
      { status: 201 },
    );
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ message: "সার্ভার এরর" }, { status: 500 });
  }
}
