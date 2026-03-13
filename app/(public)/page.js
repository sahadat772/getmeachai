'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const stats = [
  { num: '২,৪০০+', label: 'ক্রিয়েটর', icon: '🎨', color: 'var(--accent)' },
  { num: '৫৮,০০০+', label: 'সাপোর্টার', icon: '❤️', color: 'var(--cyan)' },
  { num: '৳১.২ কোটি+', label: 'মোট সাপোর্ট', icon: '💰', color: 'var(--amber)' },
  { num: '৯৯.৯%', label: 'আপটাইম', icon: '⚡', color: 'var(--green)' },
];

const steps = [
  { icon: '👤', title: 'অ্যাকাউন্ট তৈরি করুন', desc: 'ইমেইল দিয়ে সাইন আপ করুন এবং আপনার প্রোফাইল সাজান। মাত্র ১ মিনিট লাগবে!', color: 'var(--accent)' },
  { icon: '🔗', title: 'লিংক শেয়ার করুন', desc: 'আপনার ইউনিক প্রোফাইল লিংক সোশ্যাল মিডিয়ায় শেয়ার করুন।', color: 'var(--cyan)' },
  { icon: '💰', title: 'সাপোর্ট পান', desc: 'ভক্তরা bKash বা Nagad দিয়ে সরাসরি আপনাকে সাপোর্ট করতে পারবে।', color: 'var(--amber)' },
];

const features = [
  { icon: '☕', title: 'এককালীন সাপোর্ট', desc: 'ফ্যানরা যেকোনো সময় এক কাপ চা পাঠাতে পারবে — সহজে, দ্রুতে।', color: 'var(--amber)' },
  { icon: '🔄', title: 'মেম্বারশিপ', desc: 'মাসিক সাবস্ক্রিপশন সিস্টেম দিয়ে নিয়মিত ইনকাম নিশ্চিত করুন।', color: 'var(--accent)' },
  { icon: '🛍️', title: 'ডিজিটাল শপ', desc: 'ই-বুক, আর্ট, সার্ভিস — যা খুশি বিক্রি করুন আপনার পেজ থেকে।', color: 'var(--cyan)' },
  { icon: '📊', title: 'Analytics', desc: 'বিস্তারিত ড্যাশবোর্ডে দেখুন কে কোথা থেকে সাপোর্ট করছে।', color: 'var(--green)' },
  { icon: '📧', title: 'ইমেইল নোটিফিকেশন', desc: 'প্রতিটি সাপোর্টের জন্য তাৎক্ষণিক ইমেইল নোটিফিকেশন পাবেন।', color: 'var(--red)' },
  { icon: '🌙', title: 'Dark / Light Mode', desc: 'আপনার পছন্দমতো থিম বেছে নিন — চোখে আরামদায়ক অভিজ্ঞতা।', color: 'var(--accent)' },
];

const supporters = [
  { name: 'Rafi Ahmed', amount: '৳150', msg: 'অসাধারণ কন্টেন্ট! চালিয়ে যাও ভাই 🔥', time: '২ মিনিট আগে', avatar: '🧑' },
  { name: 'Nusrat Jahan', amount: '৳300', msg: 'তোমার ভিডিওগুলো আমার অনেক কাজে আসে ❤️', time: '১৫ মিনিট আগে', avatar: '👩' },
  { name: 'Tanvir Hassan', amount: '৳500', msg: 'Keep up the great work! 💪', time: '১ ঘন্টা আগে', avatar: '👨' },
  { name: 'Sadia Islam', amount: '৳200', msg: 'তোমার জন্য দোয়া রইল 🤲', time: '৩ ঘন্টা আগে', avatar: '👧' },
];

// Typing animation hook
function useTyping(words) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(function () {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(function () { setDisplayed(word.slice(0, displayed.length + 1)); }, 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(function () { setDeleting(true); }, 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(function () { setDisplayed(displayed.slice(0, -1)); }, 40);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(function () {
        setDeleting(false);
        setIndex(function (i) { return (i + 1) % words.length; });
      }, 0);
    }
    return function () { clearTimeout(timeout); };
  }, [displayed, deleting, index, words]);

  return displayed;
}

// Counter animation
function useCounter(target, duration) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(function () {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const numTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const step = numTarget / (duration / 16);
        let current = 0;
        const timer = setInterval(function () {
          current += step;
          if (current >= numTarget) {
            setCount(numTarget);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return function () { observer.disconnect(); };
  }, []);

  return { count, ref };
}

function StatCard({ stat, index }) {
  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '20px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      textAlign: 'center',
      animation: 'fadeInUp 0.6s ease forwards',
      animationDelay: (index * 0.1) + 's',
      opacity: 0,
      transition: 'border-color 0.2s, transform 0.2s',
    }}
      onMouseEnter={function (e) { e.currentTarget.style.borderColor = stat.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: stat.color, marginBottom: '4px' }}>{stat.num}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-faint)' }}>{stat.label}</div>
    </div>
  );
}

export default function HomePage() {
  const typed = useTyping(['ক্রিয়েটর', 'ব্লগার', 'ইউটিউবার', 'আর্টিস্ট', 'ডেভেলপার']);
  const [chaiCount, setChaiCount] = useState(1);
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem', position: 'relative', zIndex: 1 }}>

      {/* ============ HERO ============ */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '99px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem', background: 'var(--amber-light)', border: '1px solid var(--amber-border)', color: 'var(--amber)', animation: 'fadeInDown 0.6s ease' }}>
            🇧🇩 বাংলাদেশের ক্রিয়েটরদের জন্য তৈরি
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text)', animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            আপনার পছন্দের{' '}
            <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', minWidth: '200px' }}>
              {typed}
              <span style={{ animation: 'typing 0.8s infinite', color: 'var(--accent)' }}>|</span>
            </span>
            <br />কে সাপোর্ট করুন
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem', animation: 'fadeInUp 0.7s ease 0.2s both' }}>
            bKash বা Nagad-এ মাত্র কয়েক সেকেন্ডে চা পাঠিয়ে দিন।<br />
            সরাসরি, সহজে, আনন্দের সাথে ☕
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem', animation: 'fadeInUp 0.7s ease 0.3s both' }}>
            <Link href="/signup" style={{ padding: '16px 32px', borderRadius: '14px', background: 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: 'var(--shadow)' }}
              onMouseEnter={function (e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
              শুরু করুন — সম্পূর্ণ ফ্রি ☕
            </Link>
            <Link href="/about" style={{ padding: '16px 32px', borderRadius: '14px', background: 'var(--surface)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
              কিভাবে কাজ করে? →
            </Link>
          </div>

          {/* Live chai widget preview */}
          <div style={{ display: 'inline-block', padding: '1.5rem 2rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', animation: 'fadeInUp 0.8s ease 0.4s both', textAlign: 'left', minWidth: '280px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>Buy Rahim a chai</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>☕</span>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>×</span>
              {[1, 3, 5].map(function (n) {
                return (
                  <button key={n} onClick={function () { setChaiCount(n); }}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid', borderColor: chaiCount === n ? 'var(--amber)' : 'var(--border)', background: chaiCount === n ? 'var(--amber-light)' : 'var(--surface-2)', color: chaiCount === n ? 'var(--amber)' : 'var(--text-muted)' }}>
                    {n}
                  </button>
                );
              })}
            </div>
            <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-faint)', marginBottom: '1rem' }}>
              কিছু সুন্দর লিখুন... 💬
            </div>
            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--gradient)', color: 'white', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
              সাপোর্ট করুন ৳{chaiCount * 30} →
            </button>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section style={{ padding: '3rem 1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="md:grid-cols-4">
          {stats.map(function (stat, i) {
            return <StatCard key={stat.label} stat={stat} index={i} />;
          })}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--accent-light)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}>
              কিভাবে কাজ করে
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '1rem' }}>
              মাত্র ৩টি ধাপে{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>শুরু করুন</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }} className="md:grid-cols-3">
            {steps.map(function (step, i) {
              return (
                <div key={step.title} style={{ padding: '2rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease forwards', animationDelay: (i * 0.15) + 's', opacity: 0 }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = step.color; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: step.color }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, color: step.color, opacity: 0.08, lineHeight: 1 }}>{i + 1}</div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: step.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.25rem', border: '1px solid ' + step.color + '40' }}>
                    {step.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--cyan-light)', border: '1px solid var(--cyan-border)', color: 'var(--cyan)' }}>
              Features
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text)' }}>
              সব কিছু এক জায়গায়{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>পাবেন</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="md:grid-cols-3">
            {features.map(function (f, i) {
              return (
                <div key={f.title}
                  onMouseEnter={function () { setActiveFeature(i); }}
                  onMouseLeave={function () { setActiveFeature(null); }}
                  style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid', borderColor: activeFeature === i ? f.color : 'var(--border)', transition: 'all 0.2s ease', transform: activeFeature === i ? 'translateY(-4px)' : 'translateY(0)', boxShadow: activeFeature === i ? 'var(--shadow)' : 'none', cursor: 'default' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem', border: '1px solid ' + f.color + '40' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '1rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ RECENT SUPPORTERS ============ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', background: 'var(--green-light)', border: '1px solid var(--green-border)', color: 'var(--green)' }}>
              ❤️ সাম্প্রতিক সাপোর্ট
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text)' }}>
              মানুষ{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ভালোবাসা দিচ্ছে</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {supporters.map(function (s, i) {
              return (
                <div key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start', animation: 'slideInLeft 0.5s ease forwards', animationDelay: (i * 0.1) + 's', opacity: 0 }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                    {s.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>{s.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, background: 'var(--amber-light)', color: 'var(--amber)', border: '1px solid var(--amber-border)' }}>{s.amount}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{s.time}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.msg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '3.5rem 2rem', borderRadius: '28px', background: 'linear-gradient(135deg, var(--accent-light), var(--cyan-light))', border: '1px solid var(--accent-border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--accent-light)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>☕</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text)', marginBottom: '1rem' }}>
                আজই শুরু করুন —{' '}
                <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>সম্পূর্ণ ফ্রি!</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8, fontSize: '15px' }}>
                বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আজই আপনার ক্রিয়েটর জার্নি শুরু করুন।<br />
                কোনো ক্রেডিট কার্ড লাগবে না!
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/signup" style={{ padding: '16px 36px', borderRadius: '14px', background: 'var(--gradient)', color: 'white', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
                  onMouseEnter={function (e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  ফ্রি পেজ তৈরি করুন →
                </Link>
                <Link href="/login" style={{ padding: '16px 32px', borderRadius: '14px', background: 'var(--surface)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', border: '1px solid var(--border)', display: 'inline-block', transition: 'all 0.2s' }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'var(--border)'; }}>
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