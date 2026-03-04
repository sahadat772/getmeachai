import { notFound } from 'next/navigation';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Transaction from '../../../models/Transaction';
import PaymentSection from '../../../../components/payment/PaymentSection';

export async function generateMetadata({ params }) {
  const { username } = await params;
  await connectDB();
  const user = await User.findOne({ username }).lean();
  if (!user) return { title: 'Not Found' };
  return {
    title: `${user.name} | Get Me a Chai`,
    description: user.bio || `${user.name}-কে সাপোর্ট করুন`,
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  await connectDB();

  const user = await User.findOne({ username }).lean();
  if (!user) notFound();

  const transactions = await Transaction.find({ toUser: user._id, status: 'completed' })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const totalEarned = transactions.reduce((sum, t) => sum + t.amount, 0);
  const supporterCount = new Set(transactions.map((t) => t.fromName)).size;

  return (
    <div className="bg-gray-950 min-h-screen">

      {/* Cover + Avatar */}
      <div className="h-32 bg-linear-to-r from-amber-600/30 via-amber-400/20 to-amber-600/30" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-3xl font-mono border-4 border-gray-950">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pb-16">

          {/* Left — Profile Info */}
          <div className="md:col-span-1">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-amber-400 text-sm mb-3">@{user.username}</p>
            {user.bio && (
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{user.bio}</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-xl font-bold font-mono text-amber-400">{supporterCount}</div>
                <div className="text-xs text-gray-500 mt-1">সাপোর্টার</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-xl font-bold font-mono text-amber-400">৳{totalEarned.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">মোট আয়</div>
              </div>
            </div>

            {/* Payment numbers */}
            {(user.bkashNumber || user.nagadNumber) && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest">পেমেন্ট নম্বর</div>
                {user.bkashNumber && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-400 text-sm">📱 bKash:</span>
                    <span className="text-gray-300 text-sm font-mono">{user.bkashNumber}</span>
                  </div>
                )}
                {user.nagadNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 text-sm">💳 Nagad:</span>
                    <span className="text-gray-300 text-sm font-mono">{user.nagadNumber}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — Payment + Transactions */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <PaymentSection user={JSON.parse(JSON.stringify(user))} />

            {/* Recent Supporters */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4">সাম্প্রতিক সাপোর্ট ☕</h2>
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  এখনো কোনো সাপোর্ট আসেনি।<br />
                  <span className="text-gray-600">প্রথম সাপোর্টার হন!</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {transactions.map((t) => (
                    <div key={t._id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/50">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${t.method === 'bKash' ? 'bg-pink-900/30' : 'bg-orange-900/30'}`}>
                        {t.method === 'bKash' ? '📱' : '💳'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold truncate">{t.fromName}</span>
                          <span className="text-sm font-bold font-mono text-green-400 flex-shrink-0">+৳{t.amount}</span>
                        </div>
                        {t.message && (
                          <p className="text-xs text-gray-400 mt-1">{t.message}</p>
                        )}
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(t.createdAt).toLocaleDateString('bn-BD')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}