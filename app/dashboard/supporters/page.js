import { auth } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import Transaction from '../../models/Transaction';
import SupportersClient from './SupportersClient';

export default async function SupportersPage() {
  const session = await auth();
  await connectDB();

  const user = await User.findOne({ email: session.user.email }).lean();
  const transactions = await Transaction.find({ toUser: user._id, status: 'completed' })
    .sort({ createdAt: -1 })
    .lean();

  const supporterMap = {};
  transactions.forEach(function (t) {
    if (!supporterMap[t.fromName]) {
      supporterMap[t.fromName] = { name: t.fromName, total: 0, count: 0, last: t.createdAt };
    }
    supporterMap[t.fromName].total += t.amount;
    supporterMap[t.fromName].count += 1;
  });

  const supporters = Object.values(supporterMap).sort(function (a, b) { return b.total - a.total; });
  const totalEarned = transactions.reduce(function (sum, t) { return sum + t.amount; }, 0);

  return (
    <SupportersClient
      supporters={supporters}
      totalEarned={totalEarned}
      transactionCount={transactions.length}
    />
  );
}