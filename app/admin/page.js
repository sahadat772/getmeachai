import { auth } from '../lib/auth';
import connectDB from '../lib/mongodb';
import User from '../models/User';
import Transaction from '../models/Transaction';
import AdminOverviewClient from '../components/ui/AdminOverviewClient';

export default async function AdminPage() {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalEarned = await Transaction.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const recentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const recentTransactions = await Transaction.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        const month = date.toLocaleString('bn-BD', { month: 'short' });
        return { month, amount: (i + 1) * 1500 };
    });

    return (
        <AdminOverviewClient
            totalUsers={totalUsers}
            totalTransactions={totalTransactions}
            totalEarned={totalEarned[0]?.total || 0}
            recentUsers={JSON.parse(JSON.stringify(recentUsers))}
            recentTransactions={JSON.parse(JSON.stringify(recentTransactions))}
            monthlyData={monthlyData}
        />
    );
}