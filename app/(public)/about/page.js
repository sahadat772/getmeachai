"use client"

import Link from 'next/link';

const team = [
  { name: 'Sahadat Hossain', role: 'Founder & Developer', avatar: '👨‍💻', desc: 'Full-stack developer, বাংলাদেশের ক্রিয়েটরদের জন্য কিছু করার স্বপ্ন থেকে এই প্ল্যাটফর্ম তৈরি।' },
];

const values = [
  { icon: '🇧🇩', title: 'বাংলাদেশ ফার্স্ট', desc: 'আমরা বাংলাদেশি ক্রিয়েটরদের কথা মাথায় রেখে সব কিছু তৈরি করি — ভাষা, পেমেন্ট, সব কিছু।', color: 'var(--green)' },
  { icon: '💸', title: 'কম কমিশন', desc: 'আমরা বিশ্বাস করি ক্রিয়েটররা তাদের সাপোর্টের সর্বোচ্চ অংশ পাওয়ার যোগ্য।', color: 'var(--amber)' },
  { icon: '🔒', title: 'নিরাপত্তা', desc: 'আপনার ডেটা এবং লেনদেন সম্পূর্ণ নিরাপদ। আমরা কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করি না।', color: 'var(--cyan)' },
  { icon: '🚀', title: 'সহজ ব্যবহার', desc: 'টেক জ্ঞান ছাড়াও যে কেউ মিনিটের মধ্যে তাদের পেজ চালু করতে পারবেন।', color: 'var(--accent)' },
];

const faqs = [
  { q: 'Get Me a Chai কি সম্পূর্ণ ফ্রি?', a: 'হ্যাঁ! অ্যাকাউন্ট তৈরি করা সম্পূর্ণ বিনামূল্যে। প্রতিটি সফল ট্রানজেকশনে মাত্র একটি ছোট কমিশন নেওয়া হয়।' },
  { q: 'পেমেন্ট কিভাবে পাবো?', a: 'সাপোর্টাররা আপনার bKash বা Nagad নম্বরে সরাসরি পেমেন্ট করবে। কোনো মধ্যবর্তী ধাপ নেই।' },
  { q: 'কোন কোন ডিভাইসে কাজ করে?', a: 'সব ডিভাইসে — মোবাইল, ট্যাবলেট, কম্পিউটার। আলাদা কোনো অ্যাপ ডাউনলোড করতে হবে না।' },
  { q: 'প্রোফাইল লিংক কি কাস্টম করা যাবে?', a: 'হ্যাঁ! আপনি নিজের পছন্দমতো ইউজারনেম সেট করতে পারবেন। যেমন: getme-achai-vert.vercel.app/profile/apnar-naam' },
];

const stats = [
  { num: '২,৪০০+', label: 'ক্রিয়েটর', icon: '🎨', color: 'var(--accent)' },
  { num: '৫৮,০০০+', label: 'সাপোর্টার', icon: '❤️', color: 'var(--red)' },
  { num: '৳১.২ কোটি+', label: 'মোট সাপোর্ট', icon: '💰', color: 'var(--amber)' },
  { num: '৯৯.৯%', label: 'আপটাইম', icon: '⚡', color: 'var(--green)' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem', position: 'relative', zIndex: 1 }}>

      {/* ===== HERO ===== */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '99px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem', background: 'var(--accent-light)', border: '1px solid var(--accent-border)', color: 'var(--accent)', animation: 'fadeInDown 0.6s ease' }}>
            ☕ আমাদের গল্প
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15, color: 'var(--text)', marginBottom: '1.5rem', animation: 'fadeInUp 0.6s ease 0.1s both' }}>
            বাংলাদেশের ক্রিয়েটরদের জন্য{' '}
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>তৈরি একটি প্ল্যাটফর্ম</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: 1.85, animation: 'fadeInUp 0.6s ease 0.2s both' }}>
            আমরা বিশ্বাস করি প্রতিটি ক্রিয়েটর তার কাজের মূল্য পাওয়ার যোগ্য।
            Get Me a Chai সেই বিশ্বাস থেকেই জন্ম নিয়েছে — যেখানে ভক্তরা সরাসরি
            তাদের প্রিয় ক্রিয়েটরকে সাপোর্ট করতে পারে, কোনো ঝামেলা ছাড়াই।
          </p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="md:grid-cols-4">
          {stats.map(function (s, i) {
            return (
              <div key={s.label} style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', animation: 'fadeInUp 0.5s ease both', animationDelay: (i * 0.1) + 's', transition: 'all 0.2s' }}
                onMouseEnter={function (e) { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gap: '3rem', alignItems: 'center' }} className="md:grid-cols-2">
          <div style={{ animation: 'fadeInLeft 0.6s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--amber-light)', border: '1px solid var(--amber-border)', color: 'var(--amber)' }}>
              আমাদের গল্প
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              কেন{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get Me a Chai?</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.85 }}>
              <p>বাংলাদেশে হাজার হাজার প্রতিভাবান ক্রিয়েটর আছেন যারা প্রতিদিন অসাধারণ কন্টেন্ট তৈরি করছেন — কিন্তু তাদের সাপোর্ট করার সহজ কোনো উপায় ছিল না।</p>
              <p>বিদেশি প্ল্যাটফর্মগুলো বাংলাদেশে কাজ করে না, PayPal নেই, Stripe নেই। কিন্তু আমাদের আছে bKash, আছে Nagad।</p>
              <p>সেই ভাবনা থেকেই <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Get Me a Chai</strong> — সম্পূর্ণ বাংলাদেশি, সম্পূর্ণ আপনার জন্য।</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', animation: 'fadeInRight 0.6s ease' }}>
            {[
              { icon: '🚀', label: '২০২৪ সালে যাত্রা শুরু' },
              { icon: '💳', label: 'bKash ও Nagad সাপোর্ট' },
              { icon: '🌐', label: '১০০% বাংলাদেশি' },
              { icon: '❤️', label: 'ক্রিয়েটর-ফার্স্ট মানসিকতা' },
            ].map(function (item) {
              return (
                <div key={item.label} style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--cyan-light)', border: '1px solid var(--cyan-border)', color: 'var(--cyan)' }}>
              আমাদের মূল্যবোধ
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text)' }}>
              আমরা যা{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>বিশ্বাস করি</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="md:grid-cols-4">
            {values.map(function (v, i) {
              return (
                <div key={v.title} style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', transition: 'all 0.2s', animation: 'fadeInUp 0.5s ease both', animationDelay: (i * 0.1) + 's' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = v.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: v.color + '20', border: '1px solid ' + v.color + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '1rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--green-light)', border: '1px solid var(--green-border)', color: 'var(--green)' }}>
              👥 টিম
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text)' }}>
              যারা এটি{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>তৈরি করেছে</span>
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {team.map(function (member) {
              return (
                <div key={member.name} style={{ padding: '2rem', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', maxWidth: '320px', width: '100%', transition: 'all 0.2s' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', margin: '0 auto 1rem', boxShadow: 'var(--shadow)' }}>
                    {member.avatar}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'var(--text)', fontSize: '1.1rem', marginBottom: '4px' }}>{member.name}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{member.role}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{member.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--amber-light)', border: '1px solid var(--amber-border)', color: 'var(--amber)' }}>
              ❓ FAQ
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text)' }}>
              সচরাচর{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>জিজ্ঞাসা</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map(function (faq, i) {
              return (
                <div key={i} style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', transition: 'all 0.2s', animation: 'fadeInUp 0.5s ease both', animationDelay: (i * 0.1) + 's' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', fontSize: '15px', marginBottom: '0.5rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>Q.</span>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.75, paddingLeft: '1.5rem' }}>{faq.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '3.5rem 2rem', borderRadius: '28px', background: 'linear-gradient(135deg, var(--accent-light), var(--cyan-light))', border: '1px solid var(--accent-border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'var(--accent-light)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>☕</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '1rem' }}>
                আজই আপনার পেজ তৈরি করুন —{' '}
                <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>সম্পূর্ণ ফ্রি!</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8, fontSize: '15px' }}>
                কোনো ক্রেডিট কার্ড লাগবে না। মাত্র ১ মিনিটে শুরু করুন।
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/signup" style={{ padding: '14px 32px', borderRadius: '14px', background: 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={function (e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  ফ্রি পেজ তৈরি করুন →
                </Link>
                <Link href="/login" style={{ padding: '14px 28px', borderRadius: '14px', background: 'var(--surface)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', border: '1px solid var(--border)', transition: 'all 0.2s' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  লগ ইন করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}