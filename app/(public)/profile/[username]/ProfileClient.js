'use client';

import PaymentSection from "../../../components/payment/PaymentSection";

export default function ProfileClient({ user, transactions, totalEarned, supporterCount, totalChai }) {
  const initials = user.name?.charAt(0).toUpperCase();

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  function shareOn(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(user.name + ' এর Get Me a Chai পেজ');
    if (platform === 'Facebook') window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
    if (platform === 'Twitter') window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank');
    if (platform === 'Copy Link') copyLink();
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem', position: 'relative', zIndex: 1 }}>

      {/* Cover */}
      <div style={{ height: '200px', background: 'linear-gradient(135deg, var(--accent)30, var(--cyan)20, var(--amber)15)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #8b5cf640, #22d3ee30, #fbbf2420)' }} />
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--accent-light)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '20%', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--cyan-light)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Avatar */}
        <div style={{ position: 'relative', marginTop: '-48px', marginBottom: '1.5rem' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '20px', background: user.image ? 'transparent' : 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'white', border: '4px solid var(--bg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            {user.image ? (
              <img src={user.image} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : initials}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '2rem', paddingBottom: '4rem' }} className="md:grid-cols-[300px_1fr]">

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name & Bio */}
            <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>{user.name}</h1>
              <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem' }}>@{user.username}</p>
              {user.bio && (
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.75 }}>{user.bio}</p>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { value: supporterCount, label: 'সাপোর্টার', icon: '❤️', color: 'var(--red)' },
                { value: totalChai + '☕', label: 'মোট চা', icon: '☕', color: 'var(--amber)' },
                { value: transactions.length, label: 'ট্রানজেকশন', icon: '📊', color: 'var(--cyan)' },
                { value: '৳' + totalEarned.toLocaleString(), label: 'মোট আয়', icon: '💰', color: 'var(--green)' },
              ].map(function (s) {
                return (
                  <div key={s.label} style={{ padding: '1rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: s.color, marginBottom: '2px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Payment Numbers */}
            {(user.bkashNumber || user.nagadNumber) && (
              <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '1rem' }}>পেমেন্ট নম্বর</div>
                {user.bkashNumber && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: '#ec489920', border: '1px solid #ec489940', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>📱</span>
                    <div>
                      <div style={{ fontSize: '11px', color: '#ec4899', fontWeight: 700 }}>bKash</div>
                      <div style={{ fontSize: '14px', color: 'var(--text)', fontFamily: 'monospace', fontWeight: 600 }}>{user.bkashNumber}</div>
                    </div>
                  </div>
                )}
                {user.nagadNumber && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: '#f9731620', border: '1px solid #f9731640' }}>
                    <span style={{ fontSize: '1.1rem' }}>💳</span>
                    <div>
                      <div style={{ fontSize: '11px', color: '#f97316', fontWeight: 700 }}>Nagad</div>
                      <div style={{ fontSize: '14px', color: 'var(--text)', fontFamily: 'monospace', fontWeight: 600 }}>{user.nagadNumber}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Share */}
            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>প্রোফাইল শেয়ার করুন</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Facebook', 'Twitter', 'Copy Link'].map(function (s) {
                  return (
                    <button key={s} onClick={function () { shareOn(s); }}
                      style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Payment Section */}
            <div style={{ borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.25rem' }}>☕</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '1rem' }}>
                  {user.name?.split(' ')[0]}-কে একটা চা কিনুন
                </h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <PaymentSection user={user} />
              </div>
            </div>

            {/* Recent Supporters */}
            <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.1rem' }}>❤️</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '1rem' }}>সাম্প্রতিক সাপোর্ট</h2>
                {transactions.length > 0 && (
                  <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--green-border)' }}>
                    {transactions.length} টি
                  </span>
                )}
              </div>

              {transactions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☕</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>এখনো কোনো সাপোর্ট আসেনি।</p>
                  <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>প্রথম সাপোর্টার হন!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {transactions.map(function (t) {
                    const isBkash = t.method === 'bKash';
                    return (
                      <div key={t._id}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                        onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                        onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0, background: isBkash ? '#ec489920' : '#f9731620', border: '1px solid ' + (isBkash ? '#ec489940' : '#f9731640') }}>
                          {isBkash ? '📱' : '💳'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>{t.fromName}</span>
                            <span style={{ padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--amber-light)', color: 'var(--amber)', border: '1px solid var(--amber-border)', flexShrink: 0 }}>
                              +৳{t.amount}
                            </span>
                          </div>
                          {t.message && (
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '4px' }}>{t.message}</p>
                          )}
                          <p style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                            {new Date(t.createdAt).toLocaleDateString('bn-BD')} • {t.method}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}