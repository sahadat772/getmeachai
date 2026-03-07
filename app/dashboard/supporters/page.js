import { auth } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import Transaction from '../../models/Transaction';

export default async function SupportersPage() {
  const session = await auth();
  await connectDB();

  const user = await User.findOne({ email: session.user.email }).lean();
  const transactions = await Transaction.find({ toUser: user._id, status: 'completed' })
    .sort({ createdAt: -1 })
    .lean();

  const supporterMap = {};
  transactions.forEach((t) => {
    if (!supporterMap[t.fromName]) {
      supporterMap[t.fromName] = { name: t.fromName, total: 0, count: 0, last: t.createdAt };
    }
    supporterMap[t.fromName].total += t.amount;
    supporterMap[t.fromName].count += 1;
  });

  const supporters = Object.values(supporterMap).sort((a, b) => b.total - a.total);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 text-cyan-500">সাপোর্টারস 👥</h1>
      <p className="text-gray-300 text-sm mb-8">যারা আপনাকে সাপোর্ট করেছেন</p>

      {supporters.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-300">
          এখনো কোনো সাপোর্টার নেই।
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-gray-300 font-medium">#</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">নাম</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">মোট দান</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">বার</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">শেষ তারিখ</th>
              </tr>
            </thead>
            <tbody>
              {supporters.map((s, i) => (
                <tr key={s.name} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 text-gray-300">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-cyan-200">{s.name}</td>
                  <td className="px-6 py-4 font-mono text-amber-400 font-bold">৳{s.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{s.count} বার</td>
                  <td className="px-6 py-4 text-gray-300 text-xs">
                    {new Date(s.last).toLocaleDateString('bn-BD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}