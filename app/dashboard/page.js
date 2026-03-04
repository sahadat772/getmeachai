import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import connectDB from "../lib/mongodb";
import User from "../models/User";
import Transaction from "../models/Transaction";
import DashboardClient from "../components/ui/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) redirect("/login");

  const transactions = await Transaction.find({ toUser: user._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const totalEarned = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.toLocaleString("bn-BD", { month: "short" });
    const amount = transactions
      .filter((t) => {
        const d = new Date(t.createdAt);
        return (
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
    return { month, amount };
  });

  return (
    <DashboardClient
      user={JSON.parse(JSON.stringify(user))}
      transactions={JSON.parse(JSON.stringify(transactions))}
      totalEarned={totalEarned}
      monthlyData={monthlyData}
    />
  );
}
