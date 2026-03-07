import connectDB from '../../lib/mongodb';
import Transaction from '../../models/Transaction';
import User from '../../models/User';

export default async function AdminTransactionsPage() {
    await connectDB();
    const transactions = await Transaction.find()
        .populate('toUser', 'name username')
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1 text-cyan-700">সব ট্রানজেকশন 💰</h1>
            <p className="text-gray-300 text-sm mb-6">মোট {transactions.length}টি ট্রানজেকশন</p>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">সাপোর্টার</th>
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">ক্রিয়েটর</th>
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">পরিমাণ</th>
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">পদ্ধতি</th>
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">স্ট্যাটাস</th>
                            <th className="text-left px-6 py-4 text-gray-300 font-medium">তারিখ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4 font-bold text-emerald-600">{t.fromName}</td>
                                <td className="px-6 py-4 text-gray-300">
                                    @{t.toUser?.username || 'N/A'}
                                </td>
                                <td className="px-6 py-4 font-mono font-bold text-green-300">৳{t.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${t.method === 'bKash' ? 'bg-pink-900/30 text-pink-300' : 'bg-orange-900/30 text-orange-300'}`}>
                                        {t.method}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'completed' ? 'bg-green-900/30 text-green-300' : t.status === 'pending' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-red-900/30 text-red-300'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-300 text-xs">
                                    {new Date(t.createdAt).toLocaleDateString('bn-BD')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}