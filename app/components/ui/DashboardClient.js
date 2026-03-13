'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, AreaChart, Area,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: 'var(--amber)', fontWeight: 700 }}>৳{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export default function DashboardClient({ user, transactions, totalEarned, monthlyData }) {
  const [chartType, setChartType] = useState('bar');
  const [activeTab, setActiveTab] = useState('overview');

  const completedTx = transactions.filter(function (t) { return t.status === 'completed'; });
  const pendingTx = transactions.filter(function (t) { return t.status === 'pending'; });
  const totalChai = Math.floor(totalEarned / 30);
  const supporterCount = new Set(transactions.map(function (t) { return t.fromName; })).size;

  const kpis = [
    { label: 'মোট আয়', value: '৳' + totalEarned.toLocaleString(), icon: '💰', color: 'var(--amber)', change: '+12%' },
    { label: 'মোট চা', value: totalChai + ' ☕', icon: '☕', color: 'var(--cyan)', change: '+8%' },
    { label: 'সাপোর্টার', value: supporterCount, icon: '❤️', color: 'var(--red)', change: '+5%' },
    { label: 'ব্যালেন্স', value: '৳' + (user.balance || 0).toLocaleString(), icon: '💳', color: 'var(--green)', change: 'Available' },
  ];

  const tabs = ['overview', 'transactions'];

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '72rem', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', animation: 'fadeInDown 0.5s ease' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
            আস্সালামুয়ালাইকুম,{' '}
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {user.name?.split(' ')[0]}
            </span>{' '}👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>আপনার ক্রিয়েটর ড্যাশবোর্ডে স্বাগতম</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href={'/profile/' + user.username}
            style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
            👁️ পেজ দেখুন
          </Link>
          <Link href="/dashboard/settings"
            style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, background: 'var(--gradient)', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ⚙️ সেটিংস
          </Link>
        </div>
      </div>

      {/* Profile completion banner */}
      {!user.bkashNumber && !user.nagadNumber && (
        <div style={{ padding: '1rem 1.5rem', borderRadius: '14px', background: 'var(--amber-light)', border: '1px solid var(--amber-border)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--amber)' }}>পেমেন্ট নম্বর যোগ করুন</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>সাপোর্ট পেতে bKash বা Nagad নম্বর সেট করুন</p>
            </div>
          </div>
          <Link href="/dashboard/settings" style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, background: 'var(--amber)', color: 'white', textDecoration: 'none' }}>
            এখনই করুন →
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }} className="md:grid-cols-4">
        {kpis.map(function (kpi, i) {
          return (
            <div key={kpi.label} style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', transition: 'all 0.2s', animation: 'fadeInUp 0.5s ease forwards', animationDelay: (i * 0.1) + 's', opacity: 0 }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = kpi.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: kpi.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', border: '1px solid ' + kpi.color + '40' }}>
                  {kpi.icon}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green)', background: 'var(--green-light)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--green-border)' }}>
                  {kpi.change}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: kpi.color, marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', background: 'var(--surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)', width: 'fit-content' }}>
        {tabs.map(function (tab) {
          return (
            <button key={tab} onClick={function () { setActiveTab(tab); }}
              style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: activeTab === tab ? 'var(--gradient)' : 'transparent', color: activeTab === tab ? 'white' : 'var(--text-muted)' }}>
              {tab === 'overview' ? '📊 Overview' : '💳 Transactions'}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Chart */}
          <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '1rem' }}>মাসিক আয় (৳)</h2>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['bar', 'area'].map(function (type) {
                  return (
                    <button key={type} onClick={function () { setChartType(type); }}
                      style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', borderColor: chartType === type ? 'var(--accent)' : 'var(--border)', background: chartType === type ? 'var(--accent-light)' : 'transparent', color: chartType === type ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {type === 'bar' ? 'Bar' : 'Area'}
                    </button>
                  );
                })}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              {chartType === 'bar' ? (
                <BarChart data={monthlyData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-faint)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-faint)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </BarChart>
              ) : (
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-faint)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-faint)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} fill="url(#areaGradient)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="md:grid-cols-4">
            {[
              { icon: '🔗', label: 'প্রোফাইল লিংক', desc: 'শেয়ার করুন', href: '/profile/' + user.username, color: 'var(--accent)' },
              { icon: '👥', label: 'সাপোর্টার', desc: supporterCount + ' জন', href: '/dashboard/supporters', color: 'var(--cyan)' },
              { icon: '💳', label: 'ট্রানজেকশন', desc: transactions.length + ' টি', href: '#', color: 'var(--amber)', onClick: function () { setActiveTab('transactions'); } },
              { icon: '⚙️', label: 'সেটিংস', desc: 'প্রোফাইল এডিট', href: '/dashboard/settings', color: 'var(--green)' },
            ].map(function (item) {
              return (
                <Link key={item.label} href={item.href}
                  style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '13px', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{item.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '1rem' }}>সাম্প্রতিক সাপোর্ট</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--green-border)' }}>
                ✅ {completedTx.length} completed
              </span>
              {pendingTx.length > 0 && (
                <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--amber-light)', color: 'var(--amber)', border: '1px solid var(--amber-border)' }}>
                  ⏳ {pendingTx.length} pending
                </span>
              )}
            </div>
          </div>

          {transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☕</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>এখনো কোনো সাপোর্ট আসেনি।</p>
              <Link href={'/profile/' + user.username} style={{ display: 'inline-block', marginTop: '1rem', padding: '10px 24px', borderRadius: '10px', background: 'var(--gradient)', color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                পেজ শেয়ার করুন →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {transactions.map(function (t) {
                const isBkash = t.method === 'bKash';
                const isCompleted = t.status === 'completed';
                return (
                  <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                    onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                    onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, background: isBkash ? '#ec489920' : '#f9731620', border: '1px solid ' + (isBkash ? '#ec489940' : '#f9731640') }}>
                      {isBkash ? '📱' : '💳'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px' }}>{t.fromName}</div>
                      {t.message && <div style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.message}</div>}
                      <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{t.method} • {new Date(t.createdAt).toLocaleDateString('bn-BD')}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'var(--green)', fontSize: '15px', marginBottom: '4px' }}>+৳{t.amount}</div>
                      <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, background: isCompleted ? 'var(--green-light)' : 'var(--amber-light)', color: isCompleted ? 'var(--green)' : 'var(--amber)', border: '1px solid ' + (isCompleted ? 'var(--green-border)' : 'var(--amber-border)') }}>
                        {isCompleted ? '✅' : '⏳'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}