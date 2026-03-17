'use client';

const medals = ['🥇', '🥈', '🥉'];

export default function SupportersClient({ supporters, totalEarned, transactionCount }) {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '72rem', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem', animation: 'fadeInDown 0.5s ease' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
          সাপোর্টারস{' '}
          <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>❤️</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>যারা আপনাকে ভালোবাসা দিয়ে সাপোর্ট করেছেন</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '👥', label: 'মোট সাপোর্টার', value: supporters.length + ' জন', color: 'var(--cyan)' },
          { icon: '💰', label: 'মোট আয়', value: '৳' + totalEarned.toLocaleString(), color: 'var(--amber)' },
          { icon: '☕', label: 'মোট ট্রানজেকশন', value: transactionCount + ' টি', color: 'var(--accent)' },
        ].map(function (card, i) {
          return (
            <div key={card.label} style={{ padding: '1.25rem', borderRadius: '18px', background: 'var(--surface)', border: '1px solid var(--border)', transition: 'all 0.2s' }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = card.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{card.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: card.color, marginBottom: '2px' }}>{card.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{card.label}</div>
            </div>
          );
        })}
      </div>

      {supporters.length === 0 ? (
        <div style={{ padding: '5rem 2rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>☕</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '4px' }}>এখনো কোনো সাপোর্টার নেই।</p>
          <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>আপনার প্রোফাইল লিংক শেয়ার করুন!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Top 3 */}
          {supporters.length >= 1 && (
            <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: '1.25rem' }}>
                🏆 শীর্ষ সাপোর্টার
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {supporters.slice(0, 3).map(function (s, i) {
                  const colors = ['var(--amber)', 'var(--text-muted)', '#cd7f32'];
                  return (
                    <div key={s.name} style={{ flex: 1, minWidth: '140px', padding: '1.25rem', borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid ' + colors[i] + '40', textAlign: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={function (e) { e.currentTarget.style.borderColor = colors[i]; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={function (e) { e.currentTarget.style.borderColor = colors[i] + '40'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      <div style={{ fontSize: '1.75rem', marginBottom: '6px' }}>{medals[i]}</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '14px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: colors[i], fontFamily: 'var(--font-heading)' }}>৳{s.total.toLocaleString()}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>{s.count} বার</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Full table */}
          <div style={{ borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '15px' }}>সকল সাপোর্টার</span>
              <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--cyan-light)', color: 'var(--cyan)', border: '1px solid var(--cyan-border)' }}>
                {supporters.length} জন
              </span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['#', 'নাম', 'মোট দান', 'বার', 'শেষ তারিখ'].map(function (h) {
                      return (
                        <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)' }}>{h}</th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {supporters.map(function (s, i) {
                    return (
                      <tr key={s.name} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                        onMouseEnter={function (e) { e.currentTarget.style.background = 'var(--surface-2)'; }}
                        onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent'; }}>
                        <td style={{ padding: '14px 20px', color: 'var(--text-faint)', fontSize: '13px' }}>{i < 3 ? medals[i] : i + 1}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)' }}>{s.name}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, background: 'var(--amber-light)', color: 'var(--amber)', border: '1px solid var(--amber-border)' }}>
                            ৳{s.total.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{s.count} বার</td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-faint)', fontSize: '12px' }}>
                          {new Date(s.last).toLocaleDateString('bn-BD')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden">
              {supporters.map(function (s, i) {
                return (
                  <div key={s.name} style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'background 0.15s' }}
                    onMouseEnter={function (e) { e.currentTarget.style.background = 'var(--surface-2)'; }}
                    onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i < 3 ? '1.2rem' : '13px', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                      {i < 3 ? medals[i] : i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px' }}>{s.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{s.count} বার • {new Date(s.last).toLocaleDateString('bn-BD')}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'var(--amber)', fontSize: '15px', flexShrink: 0 }}>
                      ৳{s.total.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}