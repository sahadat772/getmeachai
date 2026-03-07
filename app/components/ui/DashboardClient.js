"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardClient({
  user,
  transactions,
  totalEarned,
  monthlyData,
}) {
  return (
    <div>
      <h1 className="text-gray-400 text-2xl font-bold mb-1">আসসালামুয়ালায়কুম, {user.name}! 👋</h1>
      <p className="text-gray-300 text-sm mb-8">আপনার ড্যাশবোর্ড</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "মোট আয়", value: `৳${totalEarned.toLocaleString()}` },
          { label: "ট্রানজেকশন", value: transactions.length },
          {
            label: "ব্যালেন্স",
            value: `৳${user.balance?.toLocaleString() || 0}`,
          },
          { label: "প্রোফাইল", value: `@${user.username}` },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
          >
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {kpi.label}
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-base font-semibold mb-6 text-orange-500">মাসিক আয় (৳)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#f3f4f6" }}
              formatter={(v) => [`৳${v}`, "আয়"]}
            />
            <Bar dataKey="amount" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold mb-5 text-fuchsia-500">সাম্প্রতিক সাপোর্ট</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            এখনো কোনো সাপোর্ট আসেনি।
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="flex items-center gap-4 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-amber-200"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${t.method === "bKash" ? "bg-pink-900/30" : "bg-orange-900/30"}`}
                >
                  {t.method === "bKash" ? "📱" : "💳"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate text-white">
                    {t.fromName}
                  </div>
                  {t.message && (
                    <div className="text-xs text-gray-400 truncate">
                      &ldquo;{t.message}&rdquo;
                    </div>
                  )}
                  <div className="text-xs text-gray-400">{t.method}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-green-400">
                    +৳{t.amount}
                  </div>
                  <div className="text-xs text-gray-300">
                    {new Date(t.createdAt).toLocaleDateString("bn-BD")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
