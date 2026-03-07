'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminOverviewClient({
    totalUsers, totalTransactions, totalEarned,
    recentUsers, recentTransactions, monthlyData
}) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-1 text-amber-500">Admin Overview 📊</h1>
            <p className="text-gray-400 text-sm mb-8">প্ল্যাটফর্মের সামগ্রিক পরিসংখ্যান</p>

            {/* KPI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'মোট ইউজার', value: totalUsers, color: 'text-blue-400' },
                    { label: 'মোট ট্রানজেকশন', value: totalTransactions, color: 'text-green-400' },
                    { label: 'মোট আয়', value: `৳${totalEarned.toLocaleString()}`, color: 'text-amber-400' },
                    { label: 'প্ল্যাটফর্ম ফি (৫%)', value: `৳${(totalEarned * 0.05).toFixed(0)}`, color: 'text-red-400' },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</div>
                        <div className={`text-2xl font-bold font-mono text-shadow-amber-500 ${kpi.color}`}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                <h2 className="text-base font-semibold mb-6 text-amber-300">মাসিক ট্রানজেকশন (৳)</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 8 }}
                            formatter={(v) => [`৳${v}`, 'আয়']}
                        />
                        <Bar dataKey="amount" fill="#ef4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h2 className="text-base font-semibold mb-4 text-lime-400">সাম্প্রতিক ইউজার</h2>
                    <div className="flex flex-col gap-3">
                        {recentUsers.map((u) => (
                            <div key={u._id} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-xl">
                                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-sm">
                                    {u.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold truncate text-amber-100">{u.name}</div>
                                    <div className="text-xs text-gray-400">@{u.username}</div>
                                </div>
                                {u.isAdmin && (
                                    <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-full">Admin</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h2 className="text-base font-semibold mb-4 text-amber-600">সাম্প্রতিক ট্রানজেকশন</h2>
                    <div className="flex flex-col gap-3">
                        {recentTransactions.map((t) => (
                            <div key={t._id} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-xl">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${t.method === 'bKash' ? 'bg-pink-900/30' : 'bg-orange-900/30'}`}>
                                    {t.method === 'bKash' ? '📱' : '💳'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-emerald-500 font-semibold truncate">{t.fromName}</div>
                                    <div className="text-xs text-gray-400">{t.method}</div>
                                </div>
                                <div className="text-sm font-bold font-mono text-green-400">+৳{t.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}