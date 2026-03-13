"use client"


import Link from 'next/link';

const links = [
  { href: '/', label: 'হোম' },
  { href: '/about', label: 'আমাদের সম্পর্কে' },
  { href: '/login', label: 'লগ ইন' },
  { href: '/signup', label: 'সাইন আপ' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>

        <div style={{ display: 'grid', gap: '2.5rem', marginBottom: '2.5rem' }} className="md:grid-cols-3">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>☕</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.1rem', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get Me a Chai
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '260px' }}>
              বাংলাদেশের ক্রিয়েটরদের জন্য সবচেয়ে সহজ সাপোর্ট প্ল্যাটফর্ম। আপনার ফ্যানরা এখন সরাসরি সাপোর্ট করতে পারবেন।
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>লিংক</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map(function (item) {
                return (
                  <Link key={item.href} href={item.href}
                    style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={function (e) { e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={function (e) { e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    <span style={{ fontSize: '10px', color: 'var(--accent)', opacity: 0.6 }}>→</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>পেমেন্ট পদ্ধতি</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: '#ec489915', border: '1px solid #ec489930', width: 'fit-content' }}>
                <span>📱</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ec4899' }}>bKash</span>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', marginLeft: '4px' }}>সাপোর্টেড</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: '#f9731615', border: '1px solid #f9731630', width: 'fit-content' }}>
                <span>💳</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>Nagad</span>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', marginLeft: '4px' }}>সাপোর্টেড</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>
            © ২০২৬ Get Me a Chai। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-faint)' }}>
            <span>Made with</span>
            <span style={{ fontSize: '1rem' }}>❤️</span>
            <span>in Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
