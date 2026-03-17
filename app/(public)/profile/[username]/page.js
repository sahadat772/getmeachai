import { notFound } from "next/navigation";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import Transaction from "../../../models/Transaction";
import ProfileClient from "./ProfileClient";

export async function generateMetadata({ params }) {
  const { username } = await params;
  await connectDB();
  const user = await User.findOne({ username }).lean();
  if (!user) return { title: "Not Found" };
  return {
    title: `${user.name} | Get Me a Chai`,
    description: user.bio || `${user.name}-কে সাপোর্ট করুন`,
    openGraph: {
      title: `${user.name} | Get Me a Chai`,
      description: user.bio || `${user.name}-কে সাপোর্ট করুন`,
    },
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  await connectDB();

  const user = await User.findOne({ username }).lean();
  if (!user) notFound();

  const transactions = await Transaction.find({
    toUser: user._id,
    status: "completed",
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const totalEarned = transactions.reduce((sum, t) => sum + t.amount, 0);
  const supporterCount = new Set(transactions.map((t) => t.fromName)).size;
  const totalChai = Math.floor(totalEarned / 30);

  return (
    <ProfileClient
      user={JSON.parse(JSON.stringify(user))}
      transactions={JSON.parse(JSON.stringify(transactions))}
      totalEarned={totalEarned}
      supporterCount={supporterCount}
      totalChai={totalChai}
    />
  );
}